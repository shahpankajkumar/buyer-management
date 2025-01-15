import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Form, notification } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from 'xlsx';
import { getBuyers } from '../../redux/action/buyerActions';
import './BuyerTable.css';
import emailjs from '@emailjs/browser';


const BuyerTable = () => {
    const dispatch = useDispatch();
    const buyersData = useSelector((state) => state?.buyer || {});
    const data = buyersData?.items || [];
    const [currentPageData, setCurrentPageData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedBuyer, setSelectedBuyer] = useState(null);

    const handleExport = (rows, fileName) => {
        const worksheet = XLSX.utils.json_to_sheet(rows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Buyers");
        XLSX.writeFile(workbook, `${fileName}.xlsx`);
    };

    const handleAllExport = () => {
        handleExport(data, "All_Buyers");
    };

    const handlePageExport = () => {
        handleExport(currentPageData, "Current_Page_Buyers");
    };

    const handleViewClick = (buyer) => {
        setSelectedBuyer(buyer);
        setIsModalVisible(true);
    };

    const handleSendMail = async () => {
        try {
            // Check if data is available and valid
            if (!Array.isArray(data) || data.length === 0) {
                throw new Error('No user data available to send.');
            }
    
            // Prepare dynamic data for Excel sheet
            const dynamicData = [
                ['Name', 'Email', 'Phone'],  // Header row
                ...data.map(user => [user.name || '', user.email || '', user.phone || '']), // Map user data
            ];
    
            // Convert the dynamic data to sheet format
            const ws = XLSX.utils.aoa_to_sheet(dynamicData); // Array of arrays (data to convert)
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'buyer'); // Append sheet to workbook
    
            // Convert workbook to binary string and then to base64
            const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
            const base64File = btoa(wbout); // Base64-encoded string of the Excel file
    
            // Prepare template parameters for email
            const templateParams = {
                attachment: base64File,  // Base64 Excel file
                attachment_name: 'buyer.xlsx',  // Name of the Excel file
            };
    
            // Send the email with the attached Excel file
            const response = await emailjs.send('service_18c80y7', 'template_0f2aohe', templateParams, {
                publicKey: 'vnMqVd-9YhnreMZcg',
            });
    
            console.log('Email sent successfully!', response.status, response.text);
        } catch (error) {
            console.error('Failed to send email:', error.message);
        }
    };
    
    // Table Columns
    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Address', dataIndex: 'address', key: 'address' },
        { title: 'Mobile No', dataIndex: 'mobileNo', key: 'mobileNo' },
        { title: 'Buyer Type', dataIndex: 'buyerType', key: 'buyerType' },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div className='view-btn'>
                    <Button onClick={() => handleViewClick(record)} style={{ marginRight: '10px' }}>View</Button>
                </div>
            ),
        },
    ];

    useEffect(() => {
        dispatch(getBuyers());
    }, [dispatch]);

    return (
        <>
            {/* Export Buttons */}
            <div className='table-btn'>
                <Button onClick={handleAllExport} className='main-btn'>
                    Export All Buyers
                </Button>
                <Button onClick={handlePageExport} className='main-btn'>
                    Export Current Page Buyers
                </Button>
                <Button onClick={handleSendMail} className='main-btn'>
                    Send Mail
                </Button>
            </div>

            {/* Ant Design Table */}
            <Table
                columns={columns}
                dataSource={data}
                pagination={{
                    pageSize: 5,
                    showSizeChanger: true,
                    pageSizeOptions: ['5', '10', '20'],
                    onChange: (page, pageSize) => {
                        const currentPageData = data.slice((page - 1) * pageSize, page * pageSize);
                        setCurrentPageData(currentPageData);
                    },
                }}
            />

            {/* Modal for viewing individual buyer details */}
            <Modal
                title="Buyer Details"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                {selectedBuyer && (
                    <div>
                        <p><strong>Name:</strong> {selectedBuyer.name}</p>
                        <p><strong>Email:</strong> {selectedBuyer.email}</p>
                        <p><strong>Address:</strong> {selectedBuyer.address}</p>
                        <p><strong>Mobile No:</strong> {selectedBuyer.mobileNo}</p>
                        <p><strong>Buyer Type:</strong> {selectedBuyer.buyerType}</p>
                        <p><strong>Cut Quality:</strong> {selectedBuyer.cutQuality}</p>
                        <p><strong>Color:</strong> {selectedBuyer.color}</p>
                        <p><strong>Clarity:</strong> {selectedBuyer.clarity}</p>
                        <p><strong>Carat Weight:</strong> {selectedBuyer.caratWeight}</p>
                    </div>
                )}
            </Modal>
        </>
    );
};

export default BuyerTable;
