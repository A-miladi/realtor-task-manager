import { UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import moment from 'jalali-moment'

import Send from '@/components/icons/Send'
import Trash from '@/components/icons/Trash'
import User from '@/components/icons/User'
import Button from '@/components/ui/Button'
import Chips from '@/components/ui/Chips'
import TextInput from '@/components/ui/TextInput'
import { QueryKeys } from '@/constants/keys'
import { useDeleteComment, useTaskComment } from '@/hooks/mutations/useTask'
import { ResponseType } from '@/types'
import { CommentType, DeleteCommentRequest, IComment } from '@/types/Task'
import toPersianDigits from '@/utils/toPersianDigits'

export interface CommentsProps {
  messages: CommentType[]
  taskId?: number | string
  adviserId: string
}

const Comments = ({ messages, adviserId, taskId }: CommentsProps) => {
  const [inputText, setInputText] = useState('')

  const queryClient = useQueryClient()

  const TaskCommentMutate: UseMutationResult<
    ResponseType<IComment>,
    Error,
    IComment
  > = useTaskComment()
  const TaskDeleteCommentMutate: UseMutationResult<
    ResponseType<IComment>,
    Error,
    DeleteCommentRequest
  > = useDeleteComment()
  const handleDeleteComment = (id: string) => {
    const body: DeleteCommentRequest = {
      taskId: taskId ?? taskId,
      id,
    }
    TaskDeleteCommentMutate.mutate(body, {
      onSuccess: () => {
        setInputText('')
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.Tasks.taskId, taskId],
        })
      },
    })
  }
  const handleTaskComment = () => {
    const body: IComment = {
      adviserId: adviserId,
      taskId: taskId ?? taskId,
      text: inputText,
    }
    TaskCommentMutate.mutate(body, {
      onSuccess: () => {
        setInputText('')

        queryClient.invalidateQueries({
          queryKey: [QueryKeys.Tasks.taskId, taskId],
        })
      },
    })
  }

  const handleSend = () => {
    if (inputText.trim()) {
      handleTaskComment()
    }
  }

  return (
    <div className='flex h-[calc(100vh-610px)] w-full flex-wrap items-end justify-center overflow-hidden border-neutral-400 pt-2 max-md:border-b max-md:py-2 md:relative md:h-full md:w-1/2 md:pb-20'>
      <div className='flex h-5/6 w-full items-end justify-center md:h-full'>
        <div className='no-scrollbar flex max-h-full w-[95%] flex-wrap overflow-y-auto'>
          {messages.map((message, idx) => (
            <div
              key={idx}
              className='mb-2 flex w-full flex-col items-start justify-between gap-1 rounded-lg bg-neutral-50 p-2'
            >
              <div className='flex h-4 w-full items-center justify-center border-b'>
                <Chips
                  text={message.adviserName}
                  textClassName='text-2xs'
                  className='h-full w-1/3 justify-start gap-1 rounded-none bg-transparent px-0 pb-3 text-neutral-700'
                  icon={<User color='var(--neutral-900)' size={15} />}
                />
                <div className='flex h-full w-1/3 items-center justify-center pb-2 text-[8px] text-neutral-600'>
                  {toPersianDigits(
                    moment(message.createdAt)
                      .locale('fa')
                      .format('dddd HH:mm jYYYY/jMM/jDD')
                  )}
                </div>
                <Button
                  onClick={() => handleDeleteComment(message.id)}
                  className='m-0 flex h-full w-1/3 items-center justify-end bg-transparent p-0 pb-2'
                >
                  <Trash size={15} />
                </Button>
              </div>

              <p className='flex whitespace-normal break-words px-2 text-right text-xs text-neutral-800 max-md:text-2xs'>
                {message.Text}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className='z-50 flex h-1/6 w-full items-center justify-center gap-4 md:absolute md:bottom-0 md:h-20 md:rounded-bl-xl md:bg-primary-50'>
        <TextInput
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          parent='w-[80%]'
          className='relative w-full border-[1px] border-neutral-600 px-3 pb-3 max-md:my-3 md:h-12'
          placeholder='متن خود را بنویسید ...'
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend()
          }}
        />
        <button onClick={handleSend}>
          <Send size={30} className='cursor-pointer' />
        </button>
      </div>
    </div>
  )
}

export default Comments
