import logging

import algokit_utils

logger = logging.getLogger(__name__)


# define deployment behaviour based on supplied app spec
def deploy() -> None:
    from smart_contracts.artifacts.carbonfootprint.carbon_footprint_contract_client import (
        CarbonFootprintContractFactory,
        RegisterDeviceArgs,
    )

    algorand = algokit_utils.AlgorandClient.from_environment()
    deployer_ = algorand.account.from_environment("DEPLOYER")

    factory = algorand.client.get_typed_app_factory(
        CarbonFootprintContractFactory, default_sender=deployer_.address
    )

    app_client, result = factory.deploy(
        on_update=algokit_utils.OnUpdate.AppendApp,
        on_schema_break=algokit_utils.OnSchemaBreak.AppendApp,
    )

    if result.operation_performed in [
        algokit_utils.OperationPerformed.Create,
        algokit_utils.OperationPerformed.Replace,
    ]:
        algorand.send.payment(
            algokit_utils.PaymentParams(
                amount=algokit_utils.AlgoAmount(algo=1),
                sender=deployer_.address,
                receiver=app_client.app_address,
            )
        )

    # Opt in to the contract first
    app_client.send.opt_in.opt_in()
    logger.info(f"Opted into {app_client.app_name} ({app_client.app_id})")

    # Register a test device
    device_id = "test-device-001"
    response = app_client.send.register_device(args=RegisterDeviceArgs(device_id=device_id))
    logger.info(
        f"Registered device on {app_client.app_name} ({app_client.app_id}) "
        f"with device_id={device_id}, device count: {response.abi_return}"
    )
    
    # Get total emissions
    emissions_response = app_client.send.get_total_emissions()
    logger.info(
        f"Total emissions: {emissions_response.abi_return}"
    )