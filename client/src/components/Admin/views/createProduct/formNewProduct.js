import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import axios from "axios";
import "./newProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail } from "../../../../redux/action";
import { newProductForm } from "../../../../redux/action";
import { Col, Row } from "react-bootstrap";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/ddl3snuoe/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "pzsfr2g4";

let noRepeat = new Set();
const FormNewProduct = ({ productId }) => {
  const dispatch = useDispatch();

  const [values, setValues] = useState("");
  const [image, setImage] = useState("");

  const handleInputValue = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const res = await axios.post(CLOUDINARY_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setImage(res.data.secure_url);
    setValue("image", res.data.secure_url);
  };

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
  } = useForm({
    defaultValues: {
      image: "",
      name: "",
      category: "",
      price: "",
      size_stock: [{ size: "S", stock: "1" }],
      detail: "",
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "size_stock",
  });

  const selectValidator = (value) => {
    return value !== "---";
  };

  const value = (e) => {
    setValues(e.target.value);
    noRepeat.clear();
  };

  const onSubmit = (data) => {
    dispatch(newProductForm(data));
    reset();
  };

  const productDetail = useSelector((state) => state.productDetail);
  useEffect(() => {
    dispatch(getProductDetail(productId));
    setImage(productDetail.image);
  }, [dispatch, setImage]);

  function fillInputs(productDetail) {
    setValue("name", productDetail.name);
    setValue("price", productDetail.price);
    setValue("detail", productDetail.detail);
    setValue("image", productDetail.image);
  }

  return (
    <>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        {console.log("productDetail", [productDetail])}
        {[productDetail].length > 0 && fillInputs(productDetail)}
        <Row>
          <Col md={8} className="new-product">
            <div>
              <label htmlFor="name" className="form-label">
                Nombre
              </label>
              <input
                id="name"
                className="form-control"
                type="text"
                {...register("name", {
                  required: true,
                  pattern: /^[a-zA-Z\s]{0,255}$/,
                  maxLength: 20,
                })}
              />
              {errors.name?.type === "required" && (
                <p className="textoError">El campo Nombre es requerido</p>
              )}
              {errors.name?.type === "maxLength" && (
                <p className="textoError">Máximo de carácteres permitidos</p>
              )}
              {errors.name?.type === "pattern" && (
                <p className="textoError">No se permiten números o símbolos</p>
              )}
            </div>
            <div>
              <label htmlFor="price" className="form-label">
                Precio
              </label>
              <input
                className="form-control"
                type="text"
                id="price"
                {...register("price", {
                  required: true,
                  pattern: /^-?\d*(\.\d+)?$/,
                })}
              />
              {errors.price?.type === "required" && (
                <p className="textoError">El campo Precio es requerido</p>
              )}
              {errors.price?.type === "pattern" && (
                <p className="textoError">Sólo números permitidos</p>
              )}
            </div>
            <div>
              <div>
                <label>Detalles</label>

                <textarea
                  rows={10}
                  className="form-control"
                  placeholder=""
                  id="floatingTextarea"
                  {...register("detail", {
                    required: true,
                  })}
                ></textarea>
                {errors.detail?.type === "required" && (
                  <p className="textoError">El campo Detalles es requerido</p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="category" className="form-label">
                Categoría
              </label>
              <select
                onClick={value}
                className="form-control"
                name="category"
                id="category"
                aria-label="Default select example"
                {...register("category", {
                  validate: selectValidator,
                })}
              >
                <option value="Camisetas">Camisetas</option>
                <option value="Botines">Botines</option>
                <option value="Balones">Balones</option>
              </select>
              {errors.category && (
                <p className="textoError">Debes seleccionar una opción</p>
              )}
            </div>
            <div>
              Tamaño:
              {fields.map((item, index) => {
                return (
                  <li className="size-stock" key={item.id}>
                    <select
                      name="select"
                      className="form-control"
                      {...register(`size_stock.${index}.size`, {
                        required: true,
                      })}
                    >
                      {values === "Camisetas" ? (
                        <>
                          <option selected value="XS">
                            XS
                          </option>
                          <option value="S">S</option>
                          <option value="M">M</option>
                          <option value="L">L</option>
                          <option value="XL">XL</option>
                          <option value="XXL">XXL</option>
                        </>
                      ) : values === "Calzado" ? (
                        <>
                          <option selected value="3">
                            3
                          </option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                        </>
                      ) : (
                        <>
                          <option selected value="5.5">
                            5
                          </option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                        </>
                      )}
                    </select>

                    {errors.size && (
                      <p className="textoError">Debes seleccionar una opción</p>
                    )}

                    <Controller
                      render={({ field }) => (
                        <input {...field} className="form-control" />
                      )}
                      name={`size_stock.${index}.stock`}
                      control={control}
                    />
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => remove(index)}
                    >
                      <Unicons.UilTrash />
                    </button>
                  </li>
                );
              })}
              <button
                className="buy btn btn-primary"
                type="button"
                onClick={() => {
                  append({ size: "", stock: "" });
                }}
              >
                AGREGAR TALLA
              </button>
            </div>
          </Col>
          <Col md={4}>
            <div>
              <label htmlFor="image" className="form-label">
                Imagen
              </label>
              {image ? (
                <div>
                  <img src={`${image}`} alt="img-product" />
                </div>
              ) : (
                <img src="/images/thumb.png" alt="img-product" width="100%" />
              )}
              <input
                disabled
                id="image"
                className="form-control"
                type="text"
                {...register("image", {})}
              />
              <input
                type="file"
                id="image"
                onChange={(e) => handleInputValue(e)}
              />
              {errors.image?.type === "required" && (
                <p className="textoError">El campo Imagen es requerido</p>
              )}
            </div>
          </Col>
        </Row>
        <div className="col-12 mt-5">
          <button type="submit" className="btn btn-danger">
            Enviar
          </button>
        </div>
      </form>
    </>
  );
};
export default FormNewProduct;
