import React, { useState } from 'react';
import { Button } from 'antd';
import { useForm } from 'react-hook-form';
import { addBuyers } from '../../redux/action/buyerActions';
import { useDispatch } from "react-redux";
import BuyerTable from '../BuyerTable/BuyerTable';
import ModalBuyer from '../ModalBuyer/ModalBuyer';
import './Buyer.css';

const AddBuyer = () => {
    // Initialize the form with react-hook-form
    const { control, handleSubmit, reset, formState: { errors } } = useForm();
    const [openResponsive, setOpenResponsive] = useState(false);
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        dispatch(addBuyers(data))
        setOpenResponsive(false); // Close modal after submission
    };

    const handleOpenModal = () => {
        reset(); // Clear previous form data
        setOpenResponsive(true);
    };


    return (
        <>
            <Button type="primary" onClick={handleOpenModal} className='btn-add-buyer'>
                Add Buyer
            </Button>

            {/* Ant Design Table */}
            <BuyerTable />

            {/* Add Buyer Modal */}
            <ModalBuyer
                openResponsive={openResponsive}
                setOpenResponsive={setOpenResponsive}
                control={control}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                errors={errors}
            />

        </>
    );
};

export default AddBuyer;
