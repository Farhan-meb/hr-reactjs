import React from "react";
import { useState, useEffect } from "react/cjs/react.development";
import EmployeeListTable from "../../components/Table/EmployeeListTable";
import { ToastContainer, toast } from "react-toastify";
import { Helmet } from "react-helmet";
import axiosInstance from "../../services/axiosInstance";
import "./Home.scss";

const Home = () => {
    const [employeeList, setEmployeeList] = useState([]);

    useEffect(() => {
        let isMount = true;
        axiosInstance.get("api/employee").then((res) => {
            if (isMount) {
                for (let employee of employeeList) {
                    employee["selected"] = false;
                }
                setEmployeeList(res.data.employees);
                if (res.data.employees.length <= 0) {
                    toast.info("No Employees to show!");
                }
            }
        });
        return () => {
            isMount = false;
        };
    }, []);

    return (
        <>
            <div className="home-container">
                <Helmet>
                    <title>Home</title>
                </Helmet>
                <div className="employeelist-table-wrapper">
                    <div className="employeelist-table">
                        <EmployeeListTable employeeList={employeeList} />
                    </div>
                </div>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
};

export default Home;