import Cookies from "js-cookie";
import { supabaseAxios } from "./server";
export const addBook = async (data: any) => {
  const user = JSON.parse(Cookies.get('user') || '{}');
  try {
    const response = await supabaseAxios.post(`/books`,
      { ...data, user_id: user.id }
    );


    if (response.status !== 201) {
      throw new Error('Kitobni qo\'shishda xato yuz berdi!');
    }
    return response.data;
  } catch (error: any) {
    const errMsg = error.response?.data?.message || 'Serverda xatolik yuz berdi.';
    throw new Error(`Kitobni qo\'shishda xatolik: ${errMsg}`);
  }

};
export const getBooks = async () => {
  const user = JSON.parse(Cookies.get('user') || '{}');
  try {
    const response = await supabaseAxios.get('/books', {
      params: {
        user_id: `eq.${user.id}`,
      }
    });
    return response.data;
  } catch (error: any) {

    throw new Error(error.message);
  }
};

export const deleteBook = async (id: any) => {
  try {
    await supabaseAxios.delete('/books', {
      params: {
        id: `eq.${id}`,
      }
    });
  } catch (error: any) {

    throw new Error(error.message);
  }
};

export const editBook = async (id: string, data: any) => {
  try {
    const response = await supabaseAxios.patch('/books', data, {
      params: {
        id: `eq.${id}`,
      },
    });

    if (response.status !== 204 && response.status !== 200) {
      throw new Error('Kitobni tahrirlashda xato yuz berdi!');
    }

    return response.data;
  } catch (error: any) {
    const errMsg = error.response?.data?.message || 'Serverda xatolik yuz berdi.';
    throw new Error(`Kitobni tahrirlashda xatolik: ${errMsg}`);
  }
};
