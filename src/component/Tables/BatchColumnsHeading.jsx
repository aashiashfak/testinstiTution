import React, { useState } from "react";
import {IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { convert24To12Hour } from "../../utils/utilityFunctions";


export const BatchColumnsHeading = () => {
  const navigate = useNavigate()

  const handleNavigate = (courseName, batchId) => {
    navigate("/course-admin/batch-form/", {
      state: {
        mode: "edit",
        courseName: courseName,
        batchId: batchId,
      },
    });
  };


  return [
    {field: "rowNumber", headerName: "#"},
    {field: "id", headerName: "ID", flex: 0.1},
    {
      field: "name",
      headerName: "Batch Name",
      flex: 0.3,
      minWidth: 200,
      renderCell: (params) => (
        <div
          onClick={() => handleNavigate(params.row.course_name, params.row.id)}
          style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            maxWidth: "100%",
            cursor: "pointer",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.textDecoration = "underline")
          }
          onMouseOut={(e) => (e.currentTarget.style.textDecoration = "none")}
        >
          {params.value || "N/A"}
        </div>
      ),
    },
    {field: "course_name", headerName: "Course Name", flex: 0.3, minWidth: 150},
    {
      field: "instructor_name",
      headerName: "Instructor Name",
      flex: 0.2,
      minWidth: 150,
    },
    {
      field: "start_date",
      headerName: "Start Date",
      flex: 0.2,
      renderCell: (params) => params.value || "N/A",
    },
    {
      field: "end_date",
      headerName: "End Date",
      flex: 0.2,
      renderCell: (params) => params.value || "N/A",
    },
    {
      field: "start_time",
      headerName: "Start Time",
      flex: 0.2,
      renderCell: (params) => convert24To12Hour(params.value) || "N/A",
    },
    {
      field: "end_time",
      headerName: "End Time",
      flex: 0.2,
      renderCell: (params) => convert24To12Hour(params.value) || "N/A",
    },
    {
      field: "strength",
      headerName: "Strength",
      flex: 0.1,
      renderCell: (params) => params.value || "N/A",
    },
    {
      field: "Edit",
      headerName: "Edit",
      flex: 0.15,
      renderCell: (params) => {
        const handleEdit = () => {
          navigate("/course-admin/batch-form/", {
            state: {
              mode: "edit",
              courseName: params.row.course_name,
              batchId: params.row.id,
            },
          });
        };

        return (
          <IconButton onClick={handleEdit}>
            <EditIcon sx={{color: "#00aeff"}} />
          </IconButton>
        );
      },
    },
  ];
};
