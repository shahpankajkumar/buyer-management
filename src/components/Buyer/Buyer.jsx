import React, { useState } from 'react';
import { Button, Modal, Form, Input, Select } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { addBuyers } from '../../redux/action/buyerActions';
import { useDispatch } from "react-redux";
import BuyerTable from '../BuyerTable/BuyerTable';
import './Buyer.css';

const { Option } = Select;

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
            <Modal
                title="Add Buyer Details"
                centered
                footer={null}
                open={openResponsive}
                onCancel={() => setOpenResponsive(false)}
                width="50%"
            >
                <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                    <Form.Item
                        label="Name"
                        validateStatus={errors.name ? 'error' : ''}
                        help={errors.name?.message}
                    >
                        <Controller
                            name="name"
                            control={control}
                            rules={{ required: "Name is required" }}
                            render={({ field }) => <Input {...field} />}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        validateStatus={errors.email ? 'error' : ''}
                        help={errors.email?.message}
                    >
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Invalid email format",
                                },
                            }}
                            render={({ field }) => <Input {...field} />}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Address"
                        validateStatus={errors.address ? 'error' : ''}
                        help={errors.address?.message}
                    >
                        <Controller
                            name="address"
                            control={control}
                            rules={{ required: "Address is required" }}
                            render={({ field }) => <Input {...field} />}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Mobile No"
                        validateStatus={errors.mobileNo ? 'error' : ''}
                        help={errors.mobileNo?.message}
                    >
                        <Controller
                            name="mobileNo"
                            control={control}
                            rules={{
                                required: "Mobile number is required",
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: "Mobile number must be 10 digits",
                                },
                            }}
                            render={({ field }) => <Input {...field} />}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Buyer Type"
                        validateStatus={errors.buyerType ? 'error' : ''}
                        help={errors.buyerType?.message}
                    >
                        <Controller
                            name="buyerType"
                            control={control}
                            rules={{ required: "Buyer type is required" }}
                            render={({ field }) => (
                                <Select {...field} placeholder="Select buyer type">
                                    <Option value="retail">Retail</Option>
                                    <Option value="wholesale">Wholesale</Option>
                                </Select>
                            )}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Cut Quality"
                        validateStatus={errors.cutQuality ? 'error' : ''}
                        help={errors.cutQuality?.message}
                    >
                        <Controller
                            name="cutQuality"
                            control={control}
                            rules={{ required: "Cut quality is required" }}
                            render={({ field }) => <Input {...field} />}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Color"
                        validateStatus={errors.color ? 'error' : ''}
                        help={errors.color?.message}
                    >
                        <Controller
                            name="color"
                            control={control}
                            rules={{ required: "Color is required" }}
                            render={({ field }) => <Input {...field} />}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Clarity"
                        validateStatus={errors.clarity ? 'error' : ''}
                        help={errors.clarity?.message}
                    >
                        <Controller
                            name="clarity"
                            control={control}
                            rules={{ required: "Clarity is required" }}
                            render={({ field }) => <Input {...field} />}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Carat Weight"
                        validateStatus={errors.caratWeight ? 'error' : ''}
                        help={errors.caratWeight?.message}
                    >
                        <Controller
                            name="caratWeight"
                            control={control}
                            rules={{
                                required: "Carat weight is required",
                                min: { value: 0, message: "Carat weight must be greater than 0" },
                            }}
                            render={({ field }) => <Input type="number" {...field} />}
                        />
                    </Form.Item>

                    <div style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </div>
                </Form>
            </Modal>
        </>
    );
};

export default AddBuyer;
