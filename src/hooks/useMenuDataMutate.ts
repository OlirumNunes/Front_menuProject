import axios, { AxiosPromise } from "axios"
import { MenuData } from "../interface/MenuData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080';

const postData = async (data: MenuData): AxiosPromise<MenuData> => {
    const response = axios.post(API_URL + '/food', data);
    return response;
}

export function useMenuDataMutate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['food-data'] })
        }
    })
    return mutate;
}