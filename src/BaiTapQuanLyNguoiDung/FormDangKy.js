import React, { Component } from 'react'
import { connect } from 'react-redux'

class FormDangKy extends Component {
    state = {
        value : {
            taiKhoan: "",
            password: "",
            email: "",
            hoTen: "",
            soDienThoai: "",
            loaiNguoiDung: "Khách Hàng",
        },
        errors: {
            taiKhoan: "",
            password: "",
            email: "",
            hoTen: "",
            soDienThoai: "",
            loaiNguoiDung: "",
        }
    }

    handleChangeInput = (event) => { // Hàm xử lí lấy value người dùng nhập vào trên thẻ input
        // 01. Lấy giá trị của thẻ input theo name
        let {value, name} = event.target

        // 02. Lấy giá trị người dùng nhập vào đưa vào object newValue thay vì truyền trực tiếp vào value trong state
        // Làm như vậy để dễ xử lí trước khi đưa toàn bộ dữ liệ vào value
        let newValue = {...this.props.nguoiDung.value}
        newValue[name] = value

        // 03. Tạo ra một error mới dựa trên error trong state
        // Làm như vậy để dễ xử lí trước khi đưa toàn bộ dữ liệ vào error
        let newErros = {... this.props.nguoiDung.errors}
        let messageErrors = '';

        // 04. Kiểm tra các trường nhập liệu không được bỏ trống
        if (value.trim() === '') { // value là value mà người dung đang nhập
            messageErrors = name + " không được bỏ trống"
        }

        // 05. Validation cho email
        let attrValue= ''
        let regex
        if (event.target.getAttribute("typeemail")) { // Lấy ra attribute của thẻ bất keetr là attribute cơ sở hay tự tạo
            attrValue = event.target.getAttribute("typeemail")
            regex =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        }
        // 06. Kiểm tra regex có tồn tại       
        if (regex) {
            if (attrValue === "email") {
                if (!regex.test(value)){
                    messageErrors = name + ' phải đúng định dạng'
                }
            }
        }

        // 07. Sau khi validation sẽ trả lỗi nếu có
        newErros[name] = messageErrors

        // 08. Xử lí setState 
        // this.setState({
        //     value: newValue,
        //     errors: newErros
        // })

        // Thay vì xử lí setState 
        this.props.dispatch({
            type: "HANDLE_CHANGE_INPUT",
            nguoiDung: {
                value: newValue,
                errors: newErros
            }
        })
    }
    handleSubmit = (event) => { // Hàm cản trở sự kiện submit của forrm
        event.preventDefault();
        
        let valid = true

        // Bắt trường hợp lỗi không cho người dùng submit
        // 01. Duyệt bắt error phải  = rỗng hết mới hợp lệ
        for (let key in this.props.nguoiDung.errors) {
            if (this.state.errors[key] !== '') {
                valid = false
                break;
            }
        }

        // 02. Kiểm tra các trường input nhập vào đều có giá trị
        for (let key in this.props.nguoiDung.values) {
            if (this.state.values[key]) {
                valid = false
                break;
            }
        } 

        if (!valid) {
            alert('Dữ liệu không hợp lệ')
            return;
        }
        // submit lên redux khi tất cả validation đã hợp lệ
        const action = {
            type: "THEM_NGUOI_DUNG",
            nguoiDung: this.props.nguoiDung.value
        }
        this.props.dispatch(action)
    }

    render() {
        let {taiKhoan, password, soDienThoai, email, hoTen, loaiNguoiDung} = this.props.nguoiDung.value
        return (
            <form className="card mt-5" onSubmit={this.handleSubmit}>
                <h3 className="card-header bg-dark text-white">Form Đăng Ký</h3>
                <div className="card-body">
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <p>Tài Khoản</p>
                                <input value={taiKhoan} className="form-control" name="taiKhoan" onChange={this.handleChangeInput}/>
                                <p className="text-danger">{this.state.errors.taiKhoan}</p>
                            </div>
                            <div className="form-group">
                                <p>Mật Khẩu</p>
                                <input value={password} className="form-control" name="password" onChange={this.handleChangeInput}/>
                                <p className="text-danger">{this.state.errors.password}</p>
                            </div>
                            <div className="form-group">
                                <p>Email</p>
                                <input value={email} typeemail="email" className="form-control" name="email" onChange={this.handleChangeInput}/>
                                <p className="text-danger">{this.state.errors.email}</p>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <p>Họ và Tên</p>
                                <input value={hoTen} className="form-control" name="hoTen" onChange={this.handleChangeInput}/>
                                <p className="text-danger">{this.state.errors.hoTen}</p>
                            </div>
                            <div className="form-group">
                                <p>Số Điện Thoại</p>
                                <input value={soDienThoai} className="form-control" name="soDienThoai" onChange={this.handleChangeInput}/>
                                <p className="text-danger">{this.state.errors.soDienThoai}</p>
                            </div>
                            <div className="form-group">
                                <p>Mã loại người dùng</p>
                                <select value={loaiNguoiDung} className="form-control" name="loaiNguoiDung" onChange={this.handleChangeInput}>
                                    <option value="Khách Hàng">Khách Hàng</option>
                                    <option value="Quản Trị">Quản Trị</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer text-left">
                        <button type="submit" className="btn btn-outline-success mr-2">Đăng Ký</button>
                        <button type="button" className="btn btn-outline-primary" onClick={()=>{
                            this.props.dispatch({
                                type: "CAP_NHAT_NGUOI_DUNG",
                                nguoiDungCapNhat: this.props.nguoiDung.value
                            })
                        }}>Cập Nhật</button>
                    </div>
                </div>
            </form>
        )
    }
}

const mapStateToProps = (state) => ({
    nguoiDungChinhSua: state.BaiTapQuanLyNguoiDungReducer.nguoiDungChinhSua,
    nguoiDung: state.BaiTapQuanLyNguoiDungReducer.nguoiDung,
})
export default connect(mapStateToProps)(FormDangKy)