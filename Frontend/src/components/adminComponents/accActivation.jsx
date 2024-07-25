import * as React from "react";
import { useState } from "react";
import { Table, Box, Typography, Sheet, Button } from "@mui/joy";
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import RecentActors from "@mui/icons-material/RecentActors";

const AccActivation = () => {
    const [editMode, setEditMode] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState("Free");

    const handleEdit = () => {
        setEditMode(!editMode);
    };

    const handleSave = () => {
        setEditMode(false);
        // Logic to save changes if needed
    };

    const handleChange = (event) => {
        setSelectedPlan(event.target.value);
    };

    return (
        <form>
            <Box
                component="section"
                sx={{
                    p: 2,
                    minHeight: "100vh",
                    maxHeight: "100vh",
                    overflow: "auto",
                }}
            >
                <Box
                    component="header"
                    sx={{
                        minHeight: 70,
                        p: 2.5,
                        backgroundColor: "#fff",
                        borderRadius: 5,
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 3,
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                    }}
                >
                    <Typography
                        level="h2"
                        startDecorator={<RecentActors />}
                        sx={{ fontFamily: '"Poppins", sans-serif', letterSpacing: 0.5 }}
                    >
                        Account Plan Activation
                    </Typography>
                </Box>
                <Box>
                    <Sheet
                        sx={{
                            mt: 2,
                            p: 3,
                            backgroundColor: "#fff",
                            border: "1px solid #d3d3d3",
                            borderRadius: "10px",
                            overflow: "auto",
                            height: "auto",
                            boxShadow: "0 5px 5px rgba(0, 0, 0, 0.2)",
                        }}
                    >
                        <Table
                            borderAxis="both"
                            color="primary"
                            stickyHeader
                            variant="soft"
                            size="lg"
                            sx={{
                                "@media (max-width: 600px)": {
                                    overflowX: "auto",
                                    display: "block",
                                    tableLayout: "auto",
                                },
                            }}
                        >
                            <thead>
                                <tr>
                                    <th style={{ textAlign: "center", width: "32%" }}>Name</th>
                                    <th style={{ textAlign: "center" }}>Username</th>
                                    <th style={{ textAlign: "center" }}>Plan Status</th>
                                    <th style={{ textAlign: "center", width: "10%" }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Juan Dela Cruz</td>
                                    <td>jjdelacruz</td>
                                    <td>
                                        {editMode ? (
                                            <select value={selectedPlan} onChange={handleChange}
                                                style={{
                                                    padding: "6px",
                                                    fontSize: "inherit",
                                                    borderRadius: "4px",
                                                    border: "1px solid #ccc",
                                                    backgroundColor: "#fff",
                                                    width: "100%"
                                                }}>
                                                <option value="Free">Free</option>
                                                <option value="Monthly - Basic">Monthly - Basic</option>
                                                <option value="Monthly - Standard">Monthly - Standard</option>
                                                <option value="Monthly - Pro">Monthly - Pro</option>
                                                <option value="Monthly - Master">Monthly - Master</option>

                                                <option value="Quarterly - Basic">Quarterly - Basic</option>
                                                <option value="Quarterly - Standard">Quarterly - Standard</option>
                                                <option value="Quarterly - Pro">Quarterly - Pro</option>
                                                <option value="Quarterly - Master">Quarterly - Master</option>

                                                <option value="Semi Annual - Basic">Semi Annual - Basic</option>
                                                <option value="Semi Annual - Standard">Semi Annual - Standard</option>
                                                <option value="Semi Annual - Pro">Semi Annual - Pro</option>
                                                <option value="Semi Annual - Master">Semi Annual - Master</option>

                                                <option value="Annually - Basic">Annually - Basic</option>
                                                <option value="Annually - Standard">Annually - Standard</option>
                                                <option value="Annually - Pro">Annually - Pro</option>
                                                <option value="Annually - Master">Annually - Master</option>

                                            </select>
                                        ) : (
                                            <Typography>{selectedPlan}</Typography>
                                        )}
                                    </td>
                                    <td style={{ textAlign: "center" }}>
                                        {editMode ? (
                                            <Button onClick={handleSave}>Save</Button>
                                        ) : (
                                            <Button onClick={handleEdit}>Edit</Button>
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Sheet>
                </Box>
            </Box>
        </form>
    );
};

export default AccActivation;
