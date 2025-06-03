import FirstStorePackageCard from "./first/FirstStorePackageCard";

const StorePackageCard = () => {
    const type = "first";
    if (type === "first") {
        return (
            <FirstStorePackageCard />
        );
    }
    return (
        <div>StorePackageCard</div>
    )
}

export default StorePackageCard