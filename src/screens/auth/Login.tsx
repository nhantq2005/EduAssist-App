import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-paper";

const Login = () => {
  const infos = [
    {
      field: "username",
      placeholder: "Tên đăng nhập",
    },
    {
      field: "password",
      placeholder: "Mật khẩu",
    }
  ]

  const [info, setInfo] = useState(
    infos.map((item) => ({ ...item, value: "" }))
  );

  return (
    <View>
        <View>
          <Text>Trợ giảng AI</Text>
        </View>
        <View>
          <Text>Chào mừng bạn đến với Trợ giảng AI</Text>
          <Text>Vui lòng đăng nhập để tiếp tục</Text>
          {info.map((item, index) => (
            <TextInput
              key={index}
              placeholder={item.placeholder}
              onChangeText={(text) => {
                const newInfo = [...info];
                newInfo[index] = { ...newInfo[index], value: text };
                setInfo(newInfo);
              }}
            />
          ))}
        </View>
        <View>
          <Text>Quên mật khẩu?</Text>
          <TouchableOpacity>
            <Text>Đăng nhập</Text>
          </TouchableOpacity> 
          <Text>Hoặc tiếp tục với</Text>
          <TouchableOpacity>
            <Text>Đăng nhập với Google</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text>Bạn chưa có tài khoản?</Text>
          <TouchableOpacity>
            <Text>Đăng ký</Text>
          </TouchableOpacity>
        </View>
    </View>
    );
};

export default Login;