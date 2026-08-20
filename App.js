import React, { useEffect } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { MyUserProvider } from './src/utils/providers/MyUserProvider';
import Toast from 'react-native-toast-message';
import { WS_URL } from './src/utils/Apis';

const App = () => {

  useEffect(() => {                                                                                                                                                                                                               
        const ws = new WebSocket(WS_URL);                                                                                                                                                         
                                                                                                                                                                                                                                 
        ws.onopen = () => {                                                                                                                                                                                                      
          console.log('Kết nối WebSocket thành công!');                                                                                                                                                                         
        };                                                                                                                                                                                                                       
                                                                                                                                                                                                                            
        ws.onmessage = (event) => {                                                                                                                                                                                              
          try {                                                                                                                                                                                                                  
            const data = JSON.parse(event.data);                                                                                                                                                                                 
                                                                                                                                                                                                                                 
            if (data.type === 'DOCUMENT_COMPLETED') {                                                                                                                                                                            
              Toast.show({                                                                                                                                                                                                       
                type: 'success',                                                                                                                                                                                                 
                text1: 'Hoàn tất! 🎉',                                                                                                                                                                                           
                text2: data.message,                                                                                                                                                                                             
                visibilityTime: 4000,                                                                                                                                                                                            
                position: 'top',                                                                                                                                                                                                 
              });                                                                                                                                                                                                                
            } else if (data.type === 'DOCUMENT_FAILED') {                                                                                                                                                                        
              Toast.show({                                                                                                                                                                                                       
                type: 'error',                                                                                                                                                                                                   
                text1: 'Lỗi xử lý',                                                                                                                                                                                              
                text2: data.message,                                                                                                                                                                                             
              });                                                                                                                                                                                                                
            }                                                                                                                                                                                                                    
          } catch (error) {                                                                                                                                                                                                      
            console.error("Lỗi parse WebSocket data:", error);                                                                                                                                                                   
          }                                                                                                                                                                                                                      
        };                                                                                                                                                                                                                       
                                                                                                                                                                                                                               
        return () => {                                                                                                                                                                                                           
          ws.close();                                                                                                                                                                                                            
        };                                                                                                                                                                                                                       
      }, []);            

  return (
    <MyUserProvider>
      <AppNavigator />
      <Toast /> 
    </MyUserProvider>
  );
};

export default App;
