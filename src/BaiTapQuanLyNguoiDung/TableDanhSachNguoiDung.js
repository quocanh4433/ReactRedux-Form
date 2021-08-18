import React, { Component } from 'react'
import { connect } from 'react-redux' 

class TableDanhSachNguoiDung extends Component {
    render() {
        return (
            <div className="card">
                <div className="card-header bg-dark text-white">
                    Thông Tin Đăng Ký
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tài Khoản</th>
                            <th>Họ Tên</th>
                            <th>Mật Khẩu</th>
                            <th>Email</th>
                            <th>SĐT</th>
                            <th>Loại Người Dùng</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.mangNguoiDung.map((nguoiDung, index)=>(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{nguoiDung.taiKhoan}</td>
                                    <td>{nguoiDung.hoTen}</td>
                                    <td>{nguoiDung.password}</td>
                                    <td>{nguoiDung.email}</td>
                                    <td>{nguoiDung.soDienThoai}</td>
                                    <td>{nguoiDung.loaiNguoiDung}</td>
                                    <td>
                                        <button className="btn btn-danger mr-2" onClick={()=>{
                                            const action = {
                                                type: "XOA_NGUOI_DUNG",
                                                taiKhoan: nguoiDung.taiKhoan
                                            }
                                            this.props.dispatch(action)
                                        }}>Xóa</button>
                                        <button className="btn btn-primary" onClick={()=>{
                                            const action = {
                                                type: "CHINH_SUA_NGUOI_DUNG",
                                                nguoiDungChinhSua: nguoiDung
                                            }
                                            this.props.dispatch(action)
                                        }}>Chỉnh Sửa</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

/*
{ return} tương đương với () 
 */

const mapStateToProps = (state) => ({
    mangNguoiDung: state.BaiTapQuanLyNguoiDungReducer.mangNguoiDung
})

export default connect(mapStateToProps)(TableDanhSachNguoiDung)