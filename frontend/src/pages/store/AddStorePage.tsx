import React, { useEffect } from 'react'
import CreateStoreForm from '../../components/the_mall/store/create_store_form/CreateStoreForm'
import { useNavbar } from '../../utils/context/NavBarContext'

const AddStorePage = () => {
    const { hideNavbar } = useNavbar();
    
    useEffect(() => {
        hideNavbar(); // Hide the navbar on mount
    }, [hideNavbar]);
    
    return (
        <div className='w-full h-screen'>
            <CreateStoreForm isDemo/>
        </div>
    )
}

export default AddStorePage