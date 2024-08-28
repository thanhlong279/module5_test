import {useEffect, useState} from "react";
import {getAllGenres} from "../service/ProductService";
import * as productService from "../service/ProductService";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

function ProductCreate() {
    const [categories, setCategories] = useState([])
    const [product, setProduct] = useState({
        id: "",
        productCode: "",
        name: "",
        categoryId: "",
        price: 0,
        quantity: 0,
        dateAdded: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        getAllCategories();
    }, [])

    const getAllCategories = async () => {
        let res = await productService.getAllGenres();
        setCategories(res);
    };

    const saveProduct = async (product) =>  {
        product.quantity = +product.quantity;
        product.price = +product.price;
        // Convert quantity to a number
        let isSuccess = await productService.saveProduct(product)
        if (isSuccess) {
            toast.success("Thêm mới thành công");
            navigate("/product");
        } else {
            toast.error("Thêm mới thất bại.");
        }
    }
    const validationSchema = Yup.object({
        productCode: Yup.string()
            .matches(/^PROD-\d{4}$/, "Mã sản phẩm phải đúng định dạng PROD-XXXX")
            .required("Mã sản phẩm là bắt buộc"),
        name: Yup.string()
            .max(100, "Tên sản phẩm không dài quá 100 ký tự")
            .required("Tên sản phẩm là bắt buộc"),
        categoryId: Yup.string()
            .required("Thể loại sản phẩm là bắt buộc"),
        dateAdded: Yup.date()
            .max(new Date(), "Ngày nhập sản phẩm không được lớn hơn ngày hiện tại")
            .required("Ngày nhập sản phẩm là bắt buộc"),
        price: Yup.number()
            .positive("Giá phải là số dương")
            .required("Giá sản phẩm là bắt buộc"),
        quantity: Yup.number()
            .integer("Số lượng phải là số nguyên")
            .positive("Số lượng phải lớn hơn 0")
            .required("Số lượng sản phẩm là bắt buộc")
        // description: Yup.string()
        //     .max(500, "Mô tả sản phẩm không dài quá 500 ký tự")
        //     .required("Mô tả sản phẩm là bắt buộc")
    });
    // const objectValid = {
        // productCode: Yup.string()
        //     .matches(/^PROD-\d{4}$/, "Mã sản phẩm phải đúng định dạng PROD-XXXX")
        //     .required("Mã sản phẩm là bắt buộc"),
        //     name: Yup.string()
        //     .max(100, "Tên sản phẩm không dài quá 100 ký tự")
        //     .required("Tên sản phẩm là bắt buộc"),
        //     categoryId: Yup.string()
        //     .required("Thể loại sản phẩm là bắt buộc"),
        //     dateOfAcquisition: Yup.date()
        //     .max(new Date(), "Ngày nhập sản phẩm không được lớn hơn ngày hiện tại")
        //     .required("Ngày nhập sản phẩm là bắt buộc"),
        //     price: Yup.number()
        //     .positive("Giá phải là số dương")
        //     .required("Giá sản phẩm là bắt buộc"),
        //     quantity: Yup.number()
        //     .integer("Số lượng phải là số nguyên")
        //     .positive("Số lượng phải lớn hơn 0")
        //     .required("Số lượng sản phẩm là bắt buộc"),
        //     description: Yup.string()
        //     .max(500, "Mô tả sản phẩm không dài quá 500 ký tự")
        //     .required("Mô tả sản phẩm là bắt buộc")


    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-9">
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h4 className="mb-0">Thêm Mới Sản Phẩm</h4>
                        </div>
                        <div className="card-body">
                            <Formik
                                initialValues={product}
                                onSubmit={saveProduct}
                                // validationSchema={Yup.object(objectValid)}
                                validationSchema={validationSchema}
                            >
                                <Form>

                                    <div className="form-group mb-3">
                                        <label htmlFor="productCode">code:</label>
                                        <Field name="productCode" className="form-control"/>
                                        <ErrorMessage name="productCode" component="p" className="text-danger"/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="name">Name Product:</label>
                                        <Field name="name" className="form-control"/>
                                        <ErrorMessage name="name" component="p" className="text-danger"/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="categoryId">Brand:</label>
                                        <Field as="select" name="categoryId" className="form-control">
                                            <option value="">The Loai</option>
                                            {categories.map(category => (
                                                <option key={category.categoryId} value={category.categoryId}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </Field>
                                        <ErrorMessage name="categoryId" component="p" className="text-danger"/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="price">Price:</label>
                                        <Field name="price" type="number" className="form-control"/>
                                        <ErrorMessage name="price" component="p" className="text-danger"/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="quantity">Quantity:</label>
                                        <Field name="quantity" type="number" className="form-control"/>
                                        <ErrorMessage name="quantity" component="p" className="text-danger"/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="dateAdded">Ngay Nhap:</label>
                                        <Field name="dateAdded" type="date" className="form-control"/>
                                        <ErrorMessage name="dateAdded" component="p" className="text-danger"/>
                                    </div>
                                    <button type="submit" className="btn btn-success w-100">Save</button>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCreate