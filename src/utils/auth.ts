import { supabaseAxios } from "./server";
export const registerUser = async (data: any) => {
  try {
    const response = await supabaseAxios.post('/users',
      data
    );

    if (response.status !== 201) {
      throw new Error('Ro‘yxatdan o‘tishda xato yuz berdi!');
    }
    return response.data;
  } catch (error: any) {
    const errMsg = error.response?.data?.message || 'Serverda xatolik yuz berdi.';
    throw new Error(`Ro‘yxatdan o‘tishda xatolik: ${errMsg}`);
  }
};

export const loginUser = async (data: any) => {
  try {
    const response = await supabaseAxios.get('/users', {
      params: {
        email: `eq.${data.email}`,
        password: `eq.${data.password}`,
      }
    });

    if (response.data.length === 0) {
      throw new Error('Foydalanuvchi topilmadi yoki parol noto‘g‘ri');
    }
    return response.data[0];
  } catch (error: any) {

    throw new Error(error.message || 'Tizimga kirishda xatolik yuz berdi');
  }
};

