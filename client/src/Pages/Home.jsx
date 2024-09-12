import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  getAllStudent,
  addStudent,
  deleteStudent,
  updateStudent,
} from "../api/student";

const Home = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(null);
  const [stream, setStream] = useState("");
  const [address, setAddress] = useState("");
  const [id, setId] = useState("");

  const [action, setAction] = useState(true);

  const getAllData = async () => {
    // const response = await getAllStudent();

    setData(response.data);
  };
  const handlesave = async (e) => {
    e.preventDefault();

    const response = await addStudent(name, age, stream, address);
    // console.log(response);

    if (response.status === 200) {
      toast.success(`${response.data}`);
    } else {
      toast.error(`${response.data}`);
    }

    handleReset();
  };

  const handleDelete = async (id) => {
    const response = await deleteStudent(id);
    // console.log(response);

    if (response.status === 200) {
      toast.success(`${response.data}`);
    } else {
      toast.error(`${response.data}`);
    }
  };

  const finalSave = async (e) => {
    e.preventDefault();
    const response = await updateStudent(name, age, stream, address, id);
    // console.log(response);

    if (response.status === 200) {
      toast.success(`${response.data}`);
    } else {
      toast.error(`${response.data}`);
    }
    handleReset();
    setId("");
  };

  useEffect(() => {
    getAllData();
  }, [handlesave, handleDelete, finalSave]);

  const handleReset = () => {
    setAddress("");
    setAge("");
    setName("");
    setStream("");
  };
  const handleupdate = (id) => {
    setAction(false);
    data.map((ele) => {
      if (ele._id === id) {
        setName(ele.Name);
        setAge(ele.Age);
        setStream(ele.Stream);
        setAddress(ele.Address);
        setId(ele._id);
      }
    });
  };
  return (
    <div className="">
      <p>
        <Toaster />
      </p>
      <form className="max-w-6xl mx-auto mt-20">
        <div className="flex justify-evenly ...">
          <div className="ml-5 mb-5 ">
            <label
              htmlFor=""
              className="block  mb-2 text-sm font-medium text-gray-50 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              id=""
              className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="mr.Xyz"
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
            />
          </div>
          <div className="ml-5 mb-5">
            <label
              htmlFor=""
              className="block  mb-2 text-sm font-medium text-gray-50 dark:text-white"
            >
              Age
            </label>
            <input
              type="number"
              id=""
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="10"
              required
              onChange={(e) => {
                setAge(e.target.value);
              }}
              value={age}
            />
          </div>
          <div className="ml-5 mb-5">
            <label
              htmlFor=""
              className="block  mb-2 text-sm font-medium text-gray-50 dark:text-white"
            >
              Stream
            </label>
            <input
              type="text"
              id=""
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="cse"
              required
              onChange={(e) => {
                setStream(e.target.value);
              }}
              value={stream}
            />
          </div>
          <div className="ml-5 mb-5">
            <label
              htmlFor=""
              className="block  mb-2 text-sm font-medium text-gray-50 dark:text-white"
            >
              Address
            </label>
            <input
              type="text"
              id=""
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="address"
              required
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              value={address}
            />
          </div>
          {action ? (
            <button
              className="pl-5 h-10 mt-7 pr-5 ml-5 rounded-xl bg-green-600 hover:bg-green-200"
              onClick={handlesave}
            >
              Save
            </button>
          ) : (
            <button
              className="pl-5 h-10 mt-7 pr-5 ml-5 rounded-xl bg-green-600 hover:bg-green-200"
              onClick={finalSave}
            >
              Update
            </button>
          )}

          <button
            type="reset"
            className="pl-5 h-10 mt-7 pr-5 ml-5 rounded-xl bg-red-600 hover:bg-red-200"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </form>
      <div>
        <div className="table max-w-7xl mx-auto  ...">
          <div className="table-header-group ...">
            <div className="table-row bg-blue-300 text-black font-serif">
              <div className="table-cell text-center p-3 font-extrabold ...">
                Name
              </div>
              <div className="table-cell text-center p-3 font-extrabold ...">
                Age
              </div>
              <div className="table-cell text-center p-3 font-extrabold ...">
                Stream
              </div>
              <div className="table-cell text-center p-3 font-extrabold ...">
                Address
              </div>
              <div className="table-cell text-center p-3 font-extrabold ...">
                Action{" "}
              </div>
            </div>
          </div>
          <div className="table-row-group bg-blue-200">
            {data.map((ele) => {
              const { Name, Age, Stream, Address } = ele;
              return (
                <div className="table-row" key={ele._id}>
                  <div className="table-cell pl-1 pr-2 text-center ...">
                    {Name}
                  </div>
                  <div className="table-cell pl-1 pr-2 text-center ...">
                    {Age}
                  </div>
                  <div className="table-cell pl-1 pr-2 text-center ...">
                    {Stream}
                  </div>
                  <div className="table-cell pl-1 pr-2 text-center ...">
                    {Address}
                  </div>
                  <div className="flex ">
                    <button
                      className="pl-5 mr-2 font-bold h-10 mt-1 pr-5 ml-2 rounded-xl bg-green-600 hover:bg-green-950"
                      onClick={() => {
                        handleupdate(ele._id);
                      }}
                    >
                      Update
                    </button>
                    <p className="mt-2">||</p>
                    <button
                      className="pl-5 mr-2 font-bold h-10 mt-1 pr-5 ml-2 rounded-xl bg-red-600 hover:bg-red-950"
                      onClick={() => {
                        handleDelete(ele._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
