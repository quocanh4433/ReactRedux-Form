const stateDefault = {
    mangNguoiDung: [
        {
            taiKhoan: "nguyenvana",
            password: "a123",
            email: "nguyenvana@gmail.com",
            hoTen: "nguyenvana",
            soDienThoai: "01234567",
            loaiNguoiDung: "khach hang",
        },
        {
            taiKhoan: "nguyenvanb",
            password: "b1234",
            email: "nguyenvanb@gmail.com",
            hoTen: "nguyenvanb",
            soDienThoai: "0234552354544",
            loaiNguoiDung: "khach hang",
        }
    ],
    nguoiDungChinhSua: {
        taiKhoan: "abc",
        password: "1234",
        email: "quocanh@gmai.com",
        hoTen: "quocAnh",
        soDienThoai: "023455",
        loaiNguoiDung: "khach hang",
    },
    nguoiDung: {
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
}

export const BaiTapQuanLyNguoiDungReducer = (state = stateDefault, action) => {
    switch(action.type) {
        case "THEM_NGUOI_DUNG": {
            // Cách 1:
            state.mangNguoiDung = [...state.mangNguoiDung, action.nguoiDung]

            //Cách 2
            // state.mangNguoiDung.push(action.mangNguoiDung) 
            return {...state}
        }
        case "XOA_NGUOI_DUNG": {
            state.mangNguoiDung = [...state.mangNguoiDung.filter(nguoiDung => nguoiDung.taiKhoan !== action.taiKhoan)]
            return {...state}
        }
        case "CHINH_SUA_NGUOI_DUNG": {
            state.nguoiDung.value = action.nguoiDungChinhSua 
            state.nguoiDung = {...state.nguoiDung}
            return {...state }
        }
        case "HANDLE_CHANGE_INPUT": {
            state.nguoiDung = action.nguoiDung
            return { ...state }
        }
        case "CAP_NHAT_NGUOI_DUNG": {
            let mangNguoiDungCapNhat = [...state.mangNguoiDung]
            // Tìm ra người dùng cần cập nhật

            // Cách 1
            // let nguoiDungCapNhat = mangNguoiDungCapNhat.find(nguoiDung => nguoiDung.taiKhoan === action.nguoiDungCapNhat.taiKhoan)

            // if (nguoiDungCapNhat) {
            //     nguoiDungCapNhat.hoTen = action.nguoiDungCapNhat.hoTen
            //     nguoiDungCapNhat.password = action.nguoiDungCapNhat.password
            //     nguoiDungCapNhat.soDienThoai = action.nguoiDungCapNhat.soDienThoai
            //     nguoiDungCapNhat.loaiNguoiDung = action.nguoiDungCapNhat.loaiNguoiDung
            //     nguoiDungCapNhat.email = action.nguoiDungCapNhat.email
            // }

            // Cách 2
            let index = mangNguoiDungCapNhat.findIndex(nguoiDung => nguoiDung.taiKhoan === action.nguoiDungCapNhat.taiKhoan)
            if(index != -1){
                mangNguoiDungCapNhat[index] = action.nguoiDungCapNhat
            }

            state.mangNguoiDung = mangNguoiDungCapNhat
            return {...state}
        }
        default: return state
    }
}