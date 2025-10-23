import { useWallet } from '@txnlab/use-wallet-react'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { CarbonFootprintContractFactory } from '../contracts/CarbonFootprintContract'
import { OnSchemaBreak, OnUpdate } from '@algorandfoundation/algokit-utils/types/app'
import { getAlgodConfigFromViteEnvironment, getIndexerConfigFromViteEnvironment } from '../utils/network/getAlgoClientConfigs'
import { AlgorandClient } from '@algorandfoundation/algokit-utils'

interface AppCallsInterface {
  openModal: boolean
  setModalState: (value: boolean) => void
}

const AppCalls = ({ openModal, setModalState }: AppCallsInterface) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [deviceId, setDeviceId] = useState<string>('')
  const [emissionAmount, setEmissionAmount] = useState<string>('')
  const [totalEmissions, setTotalEmissions] = useState<string>('')
  const { enqueueSnackbar } = useSnackbar()
  const { transactionSigner, activeAddress } = useWallet()

  const algodConfig = getAlgodConfigFromViteEnvironment()
  const indexerConfig = getIndexerConfigFromViteEnvironment()
  const algorand = AlgorandClient.fromConfig({
    algodConfig,
    indexerConfig,
  })
  algorand.setDefaultSigner(transactionSigner)

  const deployAndRegisterDevice = async () => {
    setLoading(true)

    const factory = algorand.client.getTypedAppFactory(CarbonFootprintContractFactory, {
      defaultSender: activeAddress ?? undefined,
    })

    const deployResult = await factory
      .deploy({
        onSchemaBreak: OnSchemaBreak.AppendApp,
        onUpdate: OnUpdate.AppendApp,
      })
      .catch((e: Error) => {
        enqueueSnackbar(`Error deploying the contract: ${e.message}`, { variant: 'error' })
        setLoading(false)
        return undefined
      })

    if (!deployResult) {
      return
    }

    const { appClient } = deployResult

    const response = await appClient.send.registerDevice({ 
      args: { deviceId } 
    }).catch((e: Error) => {
      enqueueSnackbar(`Error registering device: ${e.message}`, { variant: 'error' })
      setLoading(false)
      return undefined
    })

    if (!response) {
      return
    }

    enqueueSnackbar(`Device registered! Device count: ${response.return}`, { variant: 'success' })
    setLoading(false)
  }

  const recordEmission = async () => {
    setLoading(true)

    const factory = algorand.client.getTypedAppFactory(CarbonFootprintContractFactory, {
      defaultSender: activeAddress ?? undefined,
    })

    const deployResult = await factory
      .deploy({
        onSchemaBreak: OnSchemaBreak.AppendApp,
        onUpdate: OnUpdate.AppendApp,
      })
      .catch((e: Error) => {
        enqueueSnackbar(`Error deploying the contract: ${e.message}`, { variant: 'error' })
        setLoading(false)
        return undefined
      })

    if (!deployResult) {
      return
    }

    const { appClient } = deployResult

    const response = await appClient.send.recordEmission({ 
      args: { 
        deviceId, 
        emissionAmount: BigInt(emissionAmount) 
      } 
    }).catch((e: Error) => {
      enqueueSnackbar(`Error recording emission: ${e.message}`, { variant: 'error' })
      setLoading(false)
      return undefined
    })

    if (!response) {
      return
    }

    enqueueSnackbar(`Emission recorded! Total: ${response.return}`, { variant: 'success' })
    setLoading(false)
  }

  const getTotalEmissions = async () => {
    setLoading(true)

    const factory = algorand.client.getTypedAppFactory(CarbonFootprintContractFactory, {
      defaultSender: activeAddress ?? undefined,
    })

    const deployResult = await factory
      .deploy({
        onSchemaBreak: OnSchemaBreak.AppendApp,
        onUpdate: OnUpdate.AppendApp,
      })
      .catch((e: Error) => {
        enqueueSnackbar(`Error deploying the contract: ${e.message}`, { variant: 'error' })
        setLoading(false)
        return undefined
      })

    if (!deployResult) {
      return
    }

    const { appClient } = deployResult

    const response = await appClient.send.getTotalEmissions({ 
      args: {} 
    }).catch((e: Error) => {
      enqueueSnackbar(`Error getting total emissions: ${e.message}`, { variant: 'error' })
      setLoading(false)
      return undefined
    })

    if (!response) {
      return
    }

    setTotalEmissions(response.return?.toString() ?? '0')
    enqueueSnackbar(`Total emissions: ${response.return}`, { variant: 'success' })
    setLoading(false)
  }

  return (
    <dialog id="appcalls_modal" className={`modal ${openModal ? 'modal-open' : ''} bg-slate-200`}>
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">Carbon Footprint IoT Tracker</h3>
        <br />
        <input
          type="text"
          placeholder="Device ID"
          className="input input-bordered w-full mb-2"
          value={deviceId}
          onChange={(e) => {
            setDeviceId(e.target.value)
          }}
        />
        <input
          type="number"
          placeholder="Emission Amount"
          className="input input-bordered w-full mb-2"
          value={emissionAmount}
          onChange={(e) => {
            setEmissionAmount(e.target.value)
          }}
        />
        {totalEmissions && (
          <p className="mb-2">Total Emissions: {totalEmissions}</p>
        )}
        <div className="modal-action">
          <button className="btn" onClick={() => setModalState(!openModal)}>
            Close
          </button>
          <button className={`btn`} onClick={deployAndRegisterDevice} type="button">
            {loading ? <span className="loading loading-spinner" /> : 'Register Device'}
          </button>
          <button className={`btn`} onClick={recordEmission} type="button">
            {loading ? <span className="loading loading-spinner" /> : 'Record Emission'}
          </button>
          <button className={`btn`} onClick={getTotalEmissions} type="button">
            {loading ? <span className="loading loading-spinner" /> : 'Get Total'}
          </button>
        </div>
      </form>
    </dialog>
  )
}

export default AppCalls