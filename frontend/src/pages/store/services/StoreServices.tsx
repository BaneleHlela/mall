import FirstStoreServices from "./first/FirstStoreServices";

const StoreServices = () => {
    const type = "first";
    if (type === "first") {
        return (
        <div>
            <FirstStoreServices />
        </div>
        )
    }
}

export default StoreServices
