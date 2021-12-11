import React, {useState} from "react";
import {getProducts} from "../api/products";
import {getToken, getUser} from "../auth";

const NewProductForm = ({setAllProducts, allProducts}) => {
const [title, setTitle] = useState('')
const [description, setDescription] = useState('')
const [price, setPrice] = useState('')

    return (
        <div className="new-product-component-main-container">
            <form
                id="newProductSubmit"
                onSubmit={async (event)=>{
                    event.preventDefault();
                    try {
                        const token = getToken();
                        const user = getUser();
                        const createNewProduct = await getProducts(title, description, price, token);
                        setAllProducts([createNewProduct, ...allProducts]);

                    } catch (error) {
                        console.log(error)
                    }
                }}
            >
                <h2>Create Posts Here</h2>
                <fieldset className="auth-component_input">
                <label htmlFor="title">Title: </label>
                <input
                id="title"
                type="text"
                placeholder="enter title"
                value={title}
                onChange={(event)=> {
                    setTitle(event.target.value);
                }}
                ></input>
            </fieldset>

            <form action='/api/images' method="post" enctype="multipart/form-data">
            <input type='file' name='image' />
            </form>

            <fieldset className="auth-component_input">
                <label htmlFor="description">Description: </label>
                <input
                id="description"
                type="text"
                placeholder="enter description"
                value={description}
                onChange={(event)=> {
                    setDescription(event.target.value);
                }}
                ></input>
            </fieldset>
            <fieldset className="auth-component_input">
                <label htmlFor="price">Price: </label>
                <input
                id="price"
                type="text"
                placeholder="Price"
                value={price}
                onChange={(event)=> {
                    setPrice(event.target.value);
                }}
                ></input>
            </fieldset>
 
            <button type="submit" id="newProductSubmit"
            >Submit Your Ship!</button>
            </form>

        </div>
    );
}

export default NewProductForm;  