import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import { fetchServiceById } from "../../../../features/services/servicesSlice"
import MainBookWithOpenCalendar from "../book/main/MainBookWithOpenCalender"

const StoreBookServiceSection = () => {
    const { serviceId } = useParams<{ serviceId: string }>()
    const dispatch = useAppDispatch()
    const service = useAppSelector(state => state.services.selectedService)
    const isLoading = useAppSelector(state => state.services.isLoading)

    useEffect(() => {
        if (serviceId) {
            dispatch(fetchServiceById(serviceId))
        }
    }, [dispatch, serviceId])

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!service) {
        return <div>Error loading service</div>
    }

    return (
        <div>
            <MainBookWithOpenCalendar service={service}/>
        </div>
    )
}

export default StoreBookServiceSection