import api from "./api";

export const getAllStudent = () => {
  return api.get("/student/all");
};

export const addStudent = (name, age, stream, address) => {
  // Make sure the token is valid and present
  const token = localStorage.getItem("token");
  // console.log(token)
  if (!token) {
    throw new Error("No token provided");
  }

  // Perform the POST request with the corrected header name
  return api.post(
    "/student/add",
    { name, age, stream, address },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const deleteStudent = (id) => {
  const token = localStorage.getItem("token");
  // console.log(token)
  if (!token) {
    throw new Error("No token provided");
  }
  return api.delete(`/student/delete/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateStudent = (name, age, stream, address, id) => {
  const token = localStorage.getItem("token");
  return api.put(
    `/student/update/${id}`,
    { name, age, stream, address },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};
