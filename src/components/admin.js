import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "./table";
import Search from "./search";
import Pagination from "./pagination";
import { useSnackbar } from "notistack";
const Admin = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState([10]);
  const [searchData, setSearchData] = useState("");
  const [filterdata, setFilterData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      setData(response.data);
      return response.data;
    } catch (error) {
      enqueueSnackbar("error fetching data", { variant: "error" });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handelSearch = (e) => {
    const query = e.target.value;
    setSearchData(query);
    searchFilter(query);
  };

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = data.slice(indexOfFirstData, indexOfLastData);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleSelectAllData = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedData(data.map((user) => user.id));
    } else {
      setSelectedData([]);
    }
  };

  const toggleSelectData = (userId) => {
    if (selectedData.includes(userId)) {
      setSelectedData(selectedData.filter((id) => id !== userId));
    } else {
      setSelectedData([...selectedData, userId]);
    }
  };

  const searchFilter = (query) => {
    const filtered = filterdata.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
    );
    setData(filtered);
  };

  const rowClick = (clicked) => {
    if (selectedData.includes(clicked.id)) {
      setSelectedData(selectedData.filter((id) => id !== clicked.id));
    } else {
      setSelectedData([...selectedData, clicked.id]);
    }
  };
  const deleteSelected = () => {
    const updatedData = data.filter((user) => !selectedData.includes(user.id));
    const updatedFilterData = filterdata.filter(
      (user) => !selectedData.includes(user.id)
    );

    setSelectAll(false);
    setSelectedData([]);

    setData(updatedData);
    setFilterData(updatedFilterData);
  };

  const handleDeleteData = (userId) => {
    setFilterData((prevData) => prevData.filter((user) => user.id !== userId));
    setData((prevData) => prevData.filter((user) => user.id !== userId));
  };

  const handleEditDataInfo = (user) => {
    setDataToEdit(user);
    setIsEditFormVisible(true);
  };

  const handleSaveEditedData = (e) => {
    e.preventDefault();

    const updatedData = data.map((user) => {
      if (user.id === dataToEdit.id) {
        return dataToEdit;
      }
      return user;
    });

    const updatedFilterData = data.map((user) => {
      if (user.id === dataToEdit.id) {
        return dataToEdit;
      }
      return user;
    });

    setData(updatedData);
    setFilterData(updatedFilterData);

    setDataToEdit(null);
    setIsEditFormVisible(false);
  };

  const handleCancelEdit = () => {
    setDataToEdit(null);
    setIsEditFormVisible(false);
  };

  return (
    <div>
      <Search searchData={searchData} handelSearch={handelSearch} />
      <Table
        data={currentData}
        toggleSelectAllData={toggleSelectAllData}
        toggleSelectData={toggleSelectData}
        selectedData={selectedData}
        handleEditDataInfo={handleEditDataInfo}
        handleSaveEditedData={handleSaveEditedData}
        handleCancelEdit={handleCancelEdit}
        handleDeleteData={handleDeleteData}
        rowClick={rowClick}
        dataToEdit={dataToEdit}
        setDataToEdit={setDataToEdit}
        isEditFormVisible={isEditFormVisible}
      />
      <Pagination
        data={data}
        totalData={data.length}
        dataPerPage={dataPerPage}
        currentPage={currentPage}
        deleteSelected={deleteSelected}
        paginate={paginate}
      />
    </div>
  );
};

export default Admin;
