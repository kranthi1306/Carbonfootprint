from algopy import ARC4Contract, UInt64, arc4, GlobalState, LocalState, Txn, Account

class CarbonFootprintContract(ARC4Contract):
    def __init__(self) -> None:
        # Store total carbon emissions recorded
        self.total_emissions = GlobalState(UInt64(0), key="total_emissions", description="Total carbon emissions from all devices")
        # Store number of IoT devices registered
        self.device_count = GlobalState(UInt64(0), key="device_count", description="Number of registered IoT devices")
        # Track emissions per device using local state
        self.device_emissions = LocalState(UInt64, key="device_emissions", description="Emissions tracked per device") 
    @arc4.abimethod(allow_actions=["OptIn"])
    def opt_in(self) -> None:
        """Opt into the contract to enable local state storage"""
        # Initialize device emissions to 0 when opting in
        self.device_emissions[Txn.sender] = UInt64(0)
    
    @arc4.abimethod
    def register_device(self, device_id: arc4.String) -> arc4.UInt64:
        """Register a new IoT device to the system"""
        self.device_count.value += UInt64(1)
        return arc4.UInt64(self.device_count.value)
    
    @arc4.abimethod
    def record_emission(self, device_id: arc4.String, emission_amount: arc4.UInt64) -> arc4.UInt64:
        """Record carbon emission data from an IoT device"""
        # Update total emissions
        self.total_emissions.value += emission_amount.native
        # Update device-specific emissions
        self.device_emissions[Txn.sender] += emission_amount.native
        return arc4.UInt64(self.total_emissions.value)
    
    @arc4.abimethod
    def transfer_emissions(self, receiver: Account, emission_amount: arc4.UInt64) -> None:
        """Transfer emission credits from sender to receiver"""
        # Ensure sender has enough emissions to transfer
        assert self.device_emissions[Txn.sender] >= emission_amount, "Insufficient emissions to transfer"
        
        # Deduct from sender
        self.device_emissions[Txn.sender] -= emission_amount.native
        # Add to receiver
        self.device_emissions[receiver] += emission_amount.native
    
    @arc4.abimethod(readonly=True)
    def get_total_emissions(self) -> arc4.UInt64:
        """Get the total carbon emissions recorded"""
        return arc4.UInt64(self.total_emissions.value)
    
    @arc4.abimethod(readonly=True)
    def get_device_emissions(self) -> arc4.UInt64:
        """Get emissions for the calling device (sender)"""
        return arc4.UInt64(self.device_emissions[Txn.sender])
    
    @arc4.abimethod(readonly=True)
    def get_emissions_for_account(self, account: Account) -> arc4.UInt64:
        """Get emissions for a specific account"""
        return arc4.UInt64(self.device_emissions[account])
    
    @arc4.abimethod(readonly=True)
    def get_device_count(self) -> arc4.UInt64:
        """Get the total number of registered devices"""
        return arc4.UInt64(self.device_count.value)
    
    @arc4.abimethod(readonly=True)
    def get_sender_address(self) -> arc4.Address:
        """Get the address of the transaction sender"""
        return arc4.Address(Txn.sender.bytes)