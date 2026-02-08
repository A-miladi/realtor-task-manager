import { createContext, useContext } from 'react'

import {
  IFormContainer,
  IFormInputs,
  IRenderInputs,
  PropsInput,
} from '@/types/Forms'
import { cn } from '@/utils'

import RenderCheckBox from './RenderCheckBox'
import RenderInput from './RenderInput'
import RenderNumber from './RenderNumber'
import RenderRadio from './RenderRadio'
import RenderSelect from './RenderSelect'
// import RenderCheckBox from './RenderCheckBox'
// import RenderDate from './RenderDate'
// import RenderInput from './RenderInput'
// import RenderRadio from './RenderRadio'
// import RenderSelect from './RenderSelect'
// import RenderSmallSelect from './RenderSmallSelect'

const INPUTS_WITH_NO_LABEL = ['checkbox']

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FormContext = createContext<any>({})

const HandleInputType = ({ input }: PropsInput) => {
  switch (input.type) {
    case 'text':
    case 'email':
    case 'tel':
    case 'password':
      return <RenderInput input={input} />
    case 'select':
      return <RenderSelect input={input} />
    case 'number':
      return <RenderNumber input={input} />
    // case 'smallSelect':
    //   return <RenderSmallSelect input={input} />
    // case 'date':
    //   return <RenderDate input={input} />
    case 'radio':
      return <RenderRadio input={input} />
    // case 'number':
    //   return <NumberInput input={input} />
    case 'checkbox':
      return <RenderCheckBox input={input} />
    default:
      return <></>
  }
}

const RenderInputs = ({
  input,
  gridProps,
  className,
  showDeleteIcon,
  handleDelete,
}: IRenderInputs) => {
  const { errors } = useContext(FormContext)

  const renderInput = (
    <>
      {input.label && !INPUTS_WITH_NO_LABEL.includes(input.type) && (
        <label
          className={`block text-sm font-medium ${
            errors?.[input.name] ? 'text-red-600' : 'text-black'
          }`}
        >
          {input.label}
        </label>
      )}
      <HandleInputType input={input} />
      {errors?.[input.name] && (
        <p className='mt-1 text-sm text-red-600'>
          {errors?.[input.name]?.message || input.helperText}
        </p>
      )}
    </>
  )

  return (
    <div className={cn('flex items-center', className)} key={input.name}>
      <div className={`w-full ${gridProps?.flexBasis ?? 'md:flex-none'}`}>
        <div
          className={`text-right ${
            errors?.[input.name] ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          {renderInput}
        </div>
      </div>
      {showDeleteIcon && handleDelete && (
        <button
          type='button'
          onClick={() => handleDelete(input.name)}
          className='ml-2 text-red-600'
        >
          <button
            type='button'
            onClick={() => handleDelete(input.name)}
            className='mr-2 mt-7 text-red-500'
          >
            X
          </button>
          {/* You can replace this with your chosen icon */}
        </button>
      )}
    </div>
  )
}

const FormInputs = ({
  children,
  inputs,
  gridProps,
  showDotsInLabel = true,
  className,
  control,
  boxClassName,
  labelClassName,
  showDeleteIcon = false, // default to false
  handleDelete,
}: IFormInputs) => {
  return (
    <div dir='rtl' className={`grid grid-cols-1 gap-4 ${className}`}>
      {inputs.map((input, i) => (
        <RenderInputs
          className={boxClassName}
          key={`${input?.name} ${i}`}
          input={{ ...input, control, labelClassName }}
          gridProps={gridProps}
          showDotsInLabel={showDotsInLabel}
          showDeleteIcon={showDeleteIcon} // Pass the prop
          handleDelete={handleDelete} // Pass the handler
        />
      ))}
      {children}
    </div>
  )
}

const FormContainer = ({ children, errors, data, setData }: IFormContainer) => {
  return (
    <FormContext.Provider value={{ errors, data, setData }}>
      {children}
    </FormContext.Provider>
  )
}

export { FormContainer, FormInputs }
