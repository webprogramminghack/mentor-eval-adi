import React, { useState } from 'react';
import { Card } from './components/Card/Card';
import { Input } from './components/Input';
import { Button } from './components/Button';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { customAxios } from './api';
import { TodoResponse, createTodoHttpData } from './utils/types';
import { TextHeading } from './components/TextHeading';
import { ContentTodo } from './components/ContentTodo';
import { Loading } from './components/Loading/Loading';
import { Container } from './components/Container';


const App: React.FC = () => {
  const LIMIT = 20;
  const [title,setTitle] = useState("");
  const queryClient = useQueryClient();



  const createTodo = async (body:createTodoHttpData) =>{
    const res = await customAxios.post('todos',body);
    console.log(res.data)
    return res.data
  }


  const getTodo = async (pageParam: unknown): Promise<TodoResponse>=>{
    console.log(pageParam)
    const res = await customAxios.get(`todos?page=${pageParam}&limit=${LIMIT}&sort=date&order=desc`);
    return {
      todos: res.data.todos,
      nextPage: res.data.nextPage,
      hasNextPage: res.data.hasNextPage
    };
  }


  const {
    data:todoData,
    error:todoError,
    isLoading:isLoadingTodo,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey:["getTodo"],
    queryFn: ({ pageParam }) => getTodo(pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.hasNextPage) {
        return lastPage.nextPage;
      }
      return undefined;
    },
  });

  const {
    mutate :createTodoMutation,
    isPending:isCreateTodoPending,
  } =  useMutation({
    mutationFn:createTodo,
    onSuccess:() =>{
      console.log("berhasil")
      queryClient.invalidateQueries({queryKey:["getTodo"]});
      setTitle('');
    }
  })


  console.log("TODO DATA",todoData)

  if(isLoadingTodo){
    return <div>LOADING DATA....</div>
  }

  if(todoError&& !isLoadingTodo){
    return <div>ERROR FEATCHING DATA</div>
  }

  return <div className='m-auto '>

            {/* bagian header text */}
            <div className='m-15'></div>
                <TextHeading title="Let’s Get Things Done!" subtitle="One Step Closer to Your Goals"/>
            <div className='m-15'></div>

            {/* body content */}
            <Card className='medium m-auto bg-white p-10'>
              <form onSubmit={(e)=>{
                  e.preventDefault()
                  createTodoMutation({
                    title,
                    completed:false
                  })
                }}>
                <div className="flex gap-2">
                  <Input required={true} placeholder='Create new Task' value={title} onChange={(e)=>{setTitle(e.currentTarget.value)}}/>
                  <Button color='primary' isLoading={isCreateTodoPending} disabled={isCreateTodoPending}>
                    Add
                  </Button>
                </div>
              </form>
              <Container onLoadMore={()=>{fetchNextPage()}}>

              {todoData?.pages.map((item:TodoResponse) => (
                <ContentTodo data={item.todos} />
              ))}

              {/* jika load data maka tampilkan loading */}
              {isCreateTodoPending || isFetchingNextPage && (
                <div className='m-auto p-10 text-center'>
                  <Loading/>
                </div>
              )}
              </Container>
            </Card>
        </div>;
};

export default App;
