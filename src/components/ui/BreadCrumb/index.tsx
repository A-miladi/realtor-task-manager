import ArrowIcon from '@/components/icons/ArrowIcon'

/* eslint-disable @typescript-eslint/no-explicit-any */
const BreadCrumb = () => {
  const pathSegments = window.location.pathname
    .split('/')
    .filter((segment: any) => segment !== '')

  const activeSegment = pathSegments.length - 1

  return (
    <nav
      dir='rtl'
      aria-label='breadcrumb'
      className='flex h-16 w-[367px] items-center justify-center rounded-2xl bg-white'
    >
      {pathSegments.map((segment: any, index: number) => (
        <div key={index} className='flex items-center'>
          <span
            className={`${
              index === activeSegment
                ? 'text-sm font-[500] text-gray-700'
                : 'text-sm font-[500] text-gray-500'
            }`}
          >
            {PERSIAN_NAME_PAGES[segment as keyof typeof PERSIAN_NAME_PAGES]}
          </span>
          {index !== activeSegment && (
            <ArrowIcon
              size={10}
              className='mx-4 mt-0.5'
              color='var(--neutral-500)'
            />
          )}
        </div>
      ))}
    </nav>
  )
}

export default BreadCrumb

export const PERSIAN_NAME_PAGES = {
  home: 'خانه',
  business: 'تجارت الکترونیک',
  products: 'محصولات',
  restaurant: 'رستوران',
  login: 'ورود',
}
