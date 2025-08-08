import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Button, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import noReply from "../assets/images/noReply.png";

const AddProduct = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
        preview: "",  // 👈 for showing preview
    });


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("description", form.description);
        formData.append("price", form.price);
        formData.append("category", form.category);
        formData.append("image", form.image);

        setIsLoading(true);
        try {
            const res = await axios.post("http://localhost:1198/api/products", formData);
            toast.info("✅ Product added successfully!");
            setForm({
                name: "",
                description: "",
                price: "",
                category: "",
                image: "",
                preview: "",
            });
            document.querySelector('input[name="image"]').value = "";
        } catch (err) {
            console.error("Client error:", err);

            const errorMsg =
                err.response?.data?.message || "Something went wrong while submitting!";
            toast.error(`❌ ${errorMsg}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "image") {
            const file = files[0];

            // ✅ Check MIME type (allow only images)
            if (!file.type.startsWith("image/")) {
                toast.error("❌ Only image files are allowed.");
                return;
            }

            // ✅ Set preview and file
            const previewUrl = URL.createObjectURL(file);
            setForm({ ...form, image: file, preview: previewUrl });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const resetForm = () => {
        setForm({
            name: "",
            description: "",
            price: "",
            category: "",
            image: "",
            preview: "",
        });

        // Also reset the file input manually
        document.querySelector('input[name="image"]').value = "";
        console.log("clear clicked");

    };


    return (
        <>
            <Styled.Wrapper>
                <Styled.Heading>Add A Product</Styled.Heading>
                <Styled.Form
                    onSubmit={handleSubmit}
                >
                    <input
                        className="text"
                        type="text"
                        name="name"
                        placeholder="Name"
                        onChange={handleChange} required
                        value={form.name}
                    />
                    <input
                        className="text"
                        type="text"
                        name="description"
                        placeholder="Description"
                        onChange={handleChange}
                        required
                        value={form.description}
                    />

                    <input
                        className="text"
                        type="number"
                        name="price"
                        placeholder="Price"
                        onChange={handleChange}
                        required
                        value={form.price}
                    />

                    <input
                        className="text"
                        type="text"
                        name="category"
                        placeholder="Category"
                        onChange={handleChange}
                        required
                        value={form.category}
                    />

                    <Styled.ImageInputWrapper>
                        <Styled.DisplaImage style={{
                            backgroundImage: form.preview ? `url(${form.preview})` : `url(${noReply})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }} />
                        <Styled.ImageInput type="file" name="image" accept="image/*" onChange={handleChange} required />
                    </Styled.ImageInputWrapper>

                    <Styled.ButtonsWrapper>
                        <Button variant="contained" type="submit" disabled={isLoading} className="submitButton">
                            {isLoading ? <CircularProgress /> : "Submit"}
                        </Button>
                        <Button variant="contained" color="secondary" disabled={isLoading} onClick={resetForm} className="clearButton">
                            {isLoading ? <CircularProgress /> : "Clear Form"}
                        </Button>
                    </Styled.ButtonsWrapper>
                </Styled.Form>
            </Styled.Wrapper>
        </>
    );
};

export default AddProduct;


const Styled = {
    Wrapper: styled.div`
        /* border: 1px solid #f00; */
        max-width: 900px;
        padding: 50px;
        margin: auto;
        @media (width<600px) {
            padding: 15px;
        }
    `,
    Heading: styled.h2`
        margin-bottom: 15px;
    `,
    Form: styled.form`
        display: flex;
        flex-direction: column;

        input.text {
            height: 40px;
            width: 100%;
            padding: 0 15px;
            border-radius: 6px;;
            border: none;
            border: 1px solid #000;
            margin-bottom: 15px;;
        }
    `,
    ImageInputWrapper: styled.div`
        /* border: 1px solid #000; */
        display: flex;
        gap: 15px;
        align-items: flex-end;
        margin-bottom: 15px;;
        flex-wrap: wrap;
    `,
    DisplaImage: styled.div`
        background-color: #eee;
        border-radius: 6px;
        width: 200px;
        height: 200px;;
    `,
    ImageInput: styled.input`
        /* height: 40px; */
        /* width: 50%; */
        /* padding: 0 15px; */
        /* border-radius: 6px;; */
        /* border: none; */
        /* border: 1px solid #000; */
    `,
    ButtonsWrapper: styled.div`
        /* border: 1px solid #f00; */
        display: flex;
        gap: 15px;

        .submitButton, .clearButton {
            flex: 1 1 100%;
        }
    `,
    SubmitButton: styled.button`
        height: 40px;
        flex: 1 1 100%;
    `,
    ClearButton: styled.button`
        height: 40px;
        /* margin-top: 10px; */
        background-color: #f44336;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        flex: 1 1 100%;

        &:hover {
            background-color: #d32f2f;
        }
    `,

};
