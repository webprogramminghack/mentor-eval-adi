import React, { useState } from 'react';
import styles from './ContentTodo.module.scss';
import { todoHttpData } from '@/utils/types';
import TrashLogo from '../../assets/svg/icon-trash.svg'
import {  useMutation, useQueryClient } from '@tanstack/react-query';
import { customAxios } from '@/api';
import { Modal } from '../Modal';
import clsx from 'clsx';
import { Input } from '../Input';
import { Button } from '../Button';

type TextHeadingProps = {
    data:todoHttpData[];
};

export const ContentTodo: React.FC<TextHeadingProps> = ({data}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [activeData, setActiveData] = useState<todoHttpData>();

    const queryClient = useQueryClient();
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
    setIsModalOpen(false);
    };

    const deleteTodo = async (id:string) =>{
        const res = await customAxios.delete(`todos/${id}`);
        console.log(res.data)
        return res.data
      }

      const {
        mutate :deletedTodoMutation,
      } =  useMutation({
        mutationFn:deleteTodo,
        onSuccess:() =>{
          console.log("berhasil hapus")
          queryClient.invalidateQueries({queryKey:["getTodo"]});
        }
      })

      const updateTodo = async () =>{
        if (!activeData) {
            throw new Error("No active task selected");
        }

        const { completed, id, date } = activeData;

        const body = {
            title: title || activeData.title,
            completed,
            date
          };

        const res = await customAxios.put(`todos/${id}`,body);
        console.log(res.data)
        return res.data
      }

      const {
        mutate :updateTodoMutation,
        isPending:isUpdateTodoPending,
      } =  useMutation({
        mutationFn:updateTodo,
        onSuccess:() =>{
          console.log("berhasil")
          queryClient.invalidateQueries({queryKey:["getTodo"]});
          setTitle('')
          closeModal()
        }
      })

      const updateTodoChek = async ({ id, completed }: { id: string, completed: boolean }) =>{
        let body:any = {};
        console.log(completed)
        body.completed = completed
        body.title = activeData?.title
        body.date = activeData?.date
        console.log(body)
        const res = await customAxios.put(`todos/${id}`,body);
        console.log(res.data)
        return res.data
      }

      const {
        mutate :updateTodoChekMutation,
      } =  useMutation({
        mutationFn:updateTodoChek,
        onSuccess:() =>{
          console.log("berhasil")
          queryClient.invalidateQueries({queryKey:["getTodo"]});
          setTitle('')
          closeModal()
        }
      })

  return (
        <div className=''>
            {data.map((item:todoHttpData)=>
            <div key={item.id} className={clsx(styles.contentFrame,{})} style={{borderRadius:50}}>
                <div className='flex gap-2'>
                    <input type='checkbox' className={styles.checkbox} checked={item.completed}
                        onChange={(e)=>{
                            let datax:boolean = e.currentTarget.checked;
                            console.log(datax)
                            setActiveData(item)
                            updateTodoChekMutation({ id: item.id.toString(), completed: datax });
                        }
                        }>
                    </input>
                    <div className={styles.text}
                    onClick={()=>{
                        setActiveData(item)
                        openModal()
                        setTitle(item.title)
                    }}
                    >
                    {item.title}
                    </div>
                </div>
                <div className={styles.trash} onClick={()=>{
                deletedTodoMutation(item.id)
                }}>
                <TrashLogo width={20} height={20}/>
                </div>
            </div>
            )}

        <Modal isOpen={isModalOpen} onClose={closeModal} title="Edit Task">
            <form onSubmit={(e)=>{
                e.preventDefault()
                updateTodoMutation()
            }}>
            <div>
                <Input required={true} placeholder='Create new Task' value={title} onChange={(e)=>{setTitle(e.currentTarget.value)}}/>
                <div className='m-10'></div>
                <Button color='primary' width='full' isLoading={isUpdateTodoPending} disabled={isUpdateTodoPending}>
                    Save
                </Button>
            </div>
            </form>
        </Modal>

        </div>
  );
};
