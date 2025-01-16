import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Select } from 'antd';
import { Controller } from 'react-hook-form';

const { Option } = Select;

const ModalBuyer = ({
  openResponsive,
  setOpenResponsive,
  control,
  handleSubmit,
  onSubmit,
  errors,
  selectedBuyer = {}
}) => {
  
  return (
    <Modal
      title={selectedBuyer && Object.keys(selectedBuyer).length > 0 ? "Edit Buyer" : "Add Buyer"}
      centered
      footer={null}
      open={openResponsive}
      onCancel={() => setOpenResponsive(false)}
      width="50%"
    >
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      {
        selectedBuyer && Object.keys(selectedBuyer).length > 0 && (
          <Form.Item
            label="ID"
            validateStatus={errors.id ? "error" : ""}
            help={errors.id?.message}
          >
            <Controller
              name="id"
              control={control}
              defaultValue={selectedBuyer?.id || ""}
              render={({ field }) => <Input {...field} disabled />}
            />
          </Form.Item>
        )
      }
        <Form.Item
          label="Name"
          validateStatus={errors.name ? "error" : ""}
          help={errors.name?.message}
        >
          <Controller
            name="name"
            control={control}
            defaultValue={selectedBuyer?.name || ""}
            rules={{ required: "Name is required" }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>
        <Form.Item
          label="Email"
          validateStatus={errors.email ? "error" : ""}
          help={errors.email?.message}
        >
          <Controller
            name="email"
            control={control}
            defaultValue={selectedBuyer?.email || ""}
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
          validateStatus={errors.address ? "error" : ""}
          help={errors.address?.message}
        >
          <Controller
            name="address"
            control={control}
            defaultValue={selectedBuyer?.address || ""}
            rules={{ required: "Address is required" }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>
        <Form.Item
          label="Mobile No"
          validateStatus={errors.mobileNo ? "error" : ""}
          help={errors.mobileNo?.message}
        >
          <Controller
            name="mobileNo"
            control={control}
            defaultValue={selectedBuyer?.mobileNo || ""}
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
          validateStatus={errors.buyerType ? "error" : ""}
          help={errors.buyerType?.message}
        >
          <Controller
            name="buyerType"
            control={control}
            defaultValue={selectedBuyer?.buyerType || ""}
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
          validateStatus={errors.cutQuality ? "error" : ""}
          help={errors.cutQuality?.message}
        >
          <Controller
            name="cutQuality"
            control={control}
            defaultValue={selectedBuyer?.cutQuality || ""}
            rules={{ required: "Cut quality is required" }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>
        <Form.Item
          label="Color"
          validateStatus={errors.color ? "error" : ""}
          help={errors.color?.message}
        >
          <Controller
            name="color"
            control={control}
            defaultValue={selectedBuyer?.color || ""}
            rules={{ required: "Color is required" }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>
        <Form.Item
          label="Clarity"
          validateStatus={errors.clarity ? "error" : ""}
          help={errors.clarity?.message}
        >
          <Controller
            name="clarity"
            control={control}
            defaultValue={selectedBuyer?.clarity || ""}
            rules={{ required: "Clarity is required" }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>
        <Form.Item
          label="Carat Weight"
          validateStatus={errors.caratWeight ? "error" : ""}
          help={errors.caratWeight?.message}
        >
          <Controller
            name="caratWeight"
            control={control}
            defaultValue={selectedBuyer?.caratWeight || ""}
            rules={{
              required: "Carat weight is required",
              min: { value: 0, message: "Carat weight must be greater than 0" },
            }}
            render={({ field }) => <Input type="number" {...field} />}
          />
        </Form.Item>
        <Form.Item
          label="Amount"
          validateStatus={errors.amount ? "error" : ""}
          help={errors.amount?.message}
        >
          <Controller
            name="amount"
            control={control}
            defaultValue={selectedBuyer?.amount || ""}
            rules={{
              required: "Amount is required",
              min: { value: 0, message: "Amount must be greater than 0" },
            }}
            render={({ field }) => <Input type="number" {...field} />}
          />
        </Form.Item>

        {
            selectedBuyer && Object.keys(selectedBuyer).length > 0 && (
              <Form.Item
              label="Charge Add"
              validateStatus={errors.timeChargeAdd ? "error" : ""}
              help={errors.timeChargeAdd?.message}
            >
              <Controller
                name="timeChargeAdd"
                control={control}
                defaultValue={selectedBuyer?.timeChargeAdd || ""}
                rules={{
                  required: "Time Charge Add is required",
                  min: { value: 0, message: "Time Charge Add must be greater than 0" },
                }}
                render={({ field }) => <Input type="number" {...field} />}
              />
            </Form.Item>
            )
        }

        <div style={{ textAlign: "right" }}>
        <Button type="primary" htmlType="submit">
            {selectedBuyer && Object.keys(selectedBuyer).length > 0 ? "Update" : "Submit"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalBuyer;
