// import React, { useState } from 'react'
// import { useController } from 'react-hook-form'

// import SelectDate from '@/components/SelectDate'
// import { PropsInput } from '@/types/Forms'

// const RenderDate = ({ input }: PropsInput) => {
//   const [showSelectDate, setShowSelectDate] = useState(false)

//   const formatType = input?.formatType ?? ['year', 'month', 'day']

//   const {
//     field,
//     fieldState: { error },
//   } = useController({
//     name: input.name,
//     control: input.control,
//     rules: input.rules ?? {},
//   })

//   const handleOnClicked = () => {
//     setShowSelectDate(true)
//   }

//   const dateValue = field.value
//     ? formatType.reduce((accumulator, currentValue, i) => {
//         return (
//           accumulator +
//           field.value?.[currentValue] +
//           (i === formatType.length - 1 ? '' : '/')
//         )
//       }, '')
//     : ''

//   return (
//     <>
//       <div className={`relative w-full`}>
//         <input
//           ref={field.ref}
//           value={dateValue}
//           onClick={handleOnClicked}
//           readOnly
//           className={`w-full border px-3 py-2 ${
//             error ? 'border-red-500' : 'border-gray-300'
//           } rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 ${
//             error ? 'focus:ring-red-500' : 'focus:ring-blue-500'
//           } cursor-pointer pr-10`}
//           placeholder={input.placeholder}
//         />

//         <span
//           className='absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3'
//           onClick={handleOnClicked}
//         >
//           <CalendarEdit color='gray' />
//         </span>
//       </div>

//       <SelectDate
//         open={showSelectDate}
//         onClose={() => setShowSelectDate((prev) => !prev)}
//         data={field.value}
//         setData={field.onChange}
//         formatType={formatType}
//       />
//     </>
//   )
// }

// export default RenderDate
