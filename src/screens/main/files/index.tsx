import { UseQueryResult } from '@tanstack/react-query'
import { useState } from 'react'
import Filter from '@/components/icons/Filter'
import Gallery from '@/components/icons/Gallery'
import NoFile from '@/components/icons/NoFile'
import Table from '@/components/icons/Table'
import X from '@/components/icons/X'
import Button from '@/components/ui/Button'
import Pagination from '@/components/ui/Pagination'
import Spinner from '@/components/ui/Spinner'
import { Filters, useGetAllFiles } from '@/hooks/queries/useGetAllFiles'
import { ResponseWithPaginationType } from '@/types'
import { FileData } from '@/types/Files'
import { cn } from '@/utils'
import FilterForm from './FilterForm'
import Cards from './houseCard'
import DataTable from './houseTable'

export type ActiveComponentType = 'Gallery' | 'Table'
function Files() {
  const [filters, setFilters] = useState<Filters | null>(null)
  const [isFilter, setIsFilter] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const {
    data: allFiles,
    isLoading,
    isFetching,
  }: UseQueryResult<
    ResponseWithPaginationType<FileData[]>,
    Error
  > = useGetAllFiles({
    page: currentPage,
    limit: 50,
    ...filters,
  })
  const totalPages = allFiles?.totalPages

  //sort data -----
  const sortedData = allFiles?.data?.sort(
    (a, b) => new Date(b.update_at).getTime() - new Date(a.update_at).getTime()
  )
  console.log({ sortedData })
  //----------
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const [activeComponent, setActiveComponent] =
    useState<ActiveComponentType>('Table')
  return (
    <div className='relative flex h-screen w-full items-start justify-center overflow-hidden bg-white bg-opacity-40 backdrop-blur-xl md:px-2'>
      <div className='relative flex h-[90%] w-full flex-col items-center justify-start pt-16'>
        <div className='flex w-full items-center justify-between max-md:flex-col-reverse max-md:gap-1 md:h-[8%] md:py-4'>
          <div
            className='flex h-12 w-full items-center justify-between border-b-2 border-primary-600 p-2 max-md:gap-2'
            dir='rtl'
          >
            <h1 className='font-bold max-md:hidden max-md:text-sm'>
              لیست فایل ها
            </h1>
            <Button
              onClick={() => setIsFilter(!isFilter)}
              className='flex h-8 w-full items-center justify-center gap-1 border border-primary-600 bg-neutral-100 p-1 text-primary-600 md:hidden'
            >
              <p className='text-xs'>اعمال فیلتر</p>
              <Filter color='var(--primary-600)' size={20} />
            </Button>
            <div className='flex h-full items-center justify-center gap-2'>
              <span className='text-sm max-md:hidden'>حالت نمایش :</span>
              <Button
                onClick={() => setActiveComponent('Gallery')}
                className={`flex h-full items-center justify-center gap-1 p-1 ${activeComponent === 'Gallery' ? 'bg-primary-600' : 'bg-neutral-50'}`}
              >
                <p
                  className={`text-xs font-medium max-md:hidden ${activeComponent === 'Gallery' ? 'text-neutral-50' : 'text-primary-600'}`}
                >
                  عکس
                </p>
                <Gallery
                  color={`${activeComponent === 'Gallery' ? 'var(--neutral-50)' : 'var(--primary-600)'}`}
                  size={20}
                />
              </Button>
              <Button
                onClick={() => setActiveComponent('Table')}
                className={`flex h-full items-center justify-center gap-1 p-1 ${activeComponent === 'Table' ? 'bg-primary-600' : 'bg-neutral-50'}`}
              >
                <p
                  className={`text-xs font-medium max-md:hidden ${activeComponent === 'Table' ? 'text-neutral-50' : 'text-primary-600'}`}
                >
                  جدول
                </p>
                <Table
                  color={`${activeComponent === 'Table' ? 'var(--neutral-50)' : 'var(--primary-600)'}`}
                  size={20}
                />
              </Button>
            </div>
          </div>
        </div>
        <div className='flex h-full w-full overflow-hidden'>
          <section
            className='mt-1 flex h-[89%] w-full flex-col items-start justify-start px-1 pt-1 md:mx-1 md:w-[78%]'
            dir='rtl'
          >
            {activeComponent === 'Gallery' && (
              <div
                className={`flex w-full flex-wrap items-center justify-center gap-2 overflow-y-auto px-2 md:items-start md:justify-start ${allFiles?.data?.length ? 'w-auto' : 'w-full'}`}
              >
                {isLoading || isFetching ? (
                  <div className='flex w-full flex-col items-center justify-center gap-2 overflow-hidden py-60'>
                    <Spinner />
                  </div>
                ) : allFiles?.data?.length ? (
                  sortedData?.map((i, idx) => {
                    return <Cards key={idx} item={i} />
                  })
                ) : (
                  <div className='flex w-full flex-col items-center justify-center gap-2 overflow-hidden py-60'>
                    <NoFile color='var(--warning-500)' size={150} />
                    <p className='text-sm text-neutral-700'>
                      فایلی برای نمایش وجود ندارد
                    </p>
                  </div>
                )}
                <div className='flex h-10 w-full items-center justify-center'>
                  {allFiles?.data?.length ? (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  ) : null}
                </div>
              </div>
            )}
            {activeComponent === 'Table' && (
              <>
                <main
                  className='relative mt-1 w-full overflow-y-hidden rounded-t-lg md:rounded-t-lg'
                  dir='rtl'
                >
                  {isLoading || isFetching ? (
                    <div className='flex w-full flex-col items-center justify-center gap-2 overflow-hidden py-60'>
                      <Spinner />
                    </div>
                  ) : allFiles?.data?.length ? (
                    <div className='flex h-full w-[320%] flex-col items-start justify-start md:w-[250%]'>
                      <thead className='flex h-12 w-full items-center justify-between border-b border-primary-600'>
                        <tr
                          className={`no-scrollbar flex h-full w-full items-center justify-between overflow-hidden overflow-x-auto bg-primary-600 text-neutral-50`}
                        >
                          <th className='flex h-full w-1/5 items-center justify-center text-center text-xs font-medium max-md:text-2xs'>
                            مشاور
                          </th>
                          <th className='flex h-full w-1/5 items-center justify-center text-center text-xs font-medium max-md:text-2xs'>
                            نام و نام خانوادگی مالک
                          </th>
                          <th className='flex h-full w-1/5 items-center justify-center text-center text-xs font-medium max-md:text-2xs'>
                            تلفن مالک
                          </th>
                          <th className='flex h-full w-1/5 items-center justify-center text-center text-xs font-medium max-md:text-2xs'>
                            نوع معامله
                          </th>
                          <th className='flex h-full w-1/5 items-center justify-center text-center text-xs font-medium max-md:text-2xs'>
                            نوع ملک
                          </th>
                          <th className='flex h-full w-1/5 items-center justify-center text-center text-xs font-medium max-md:text-2xs'>
                            کاربری
                          </th>
                          <th className='flex h-full w-1/5 items-center justify-center text-center text-xs font-medium max-md:text-2xs'>
                            متراژ
                          </th>
                          <th className='flex h-full w-1/5 items-center justify-center text-center text-xs font-medium max-md:text-2xs'>
                            منطقه
                          </th>
                          <th className='flex h-full w-1/5 items-center justify-center text-center text-xs font-medium max-md:text-2xs'>
                            خیابان
                          </th>
                          <th className='flex h-full w-1/5 items-center justify-center text-center text-xs font-medium max-md:text-2xs'>
                            کوچه
                          </th>
                          <th
                            className={cn(
                              'flex h-full w-1/5 items-center justify-center gap-1 text-center text-xs font-medium max-md:text-2xs',
                              {
                                hidden: filters?.dealType === 'رهن و اجاره',
                              }
                            )}
                          >
                            <p>قیمت </p>
                            <p className='text-[6px] font-thin text-neutral-300 md:text-2xs'>
                              (تومان)
                            </p>
                          </th>
                          <th
                            className={cn(
                              'flex h-full w-1/5 items-center justify-center gap-1 text-center text-xs font-medium max-md:text-2xs',
                              {
                                hidden:
                                  filters?.dealType !== 'رهن و اجاره' &&
                                  filters?.dealType !== undefined &&
                                  filters?.dealType !== '',
                              }
                            )}
                          >
                            <p>رهن </p>
                            <p className='text-[6px] font-thin text-neutral-300 md:text-2xs'>
                              (تومان)
                            </p>
                          </th>
                          <th
                            className={cn(
                              'flex h-full w-1/5 items-center justify-center gap-1 text-center text-xs font-medium max-md:text-2xs',
                              {
                                hidden:
                                  filters?.dealType !== 'رهن و اجاره' &&
                                  filters?.dealType !== undefined &&
                                  filters?.dealType !== '',
                              }
                            )}
                          >
                            <p>اجاره </p>
                            <p className='text-[6px] font-thin text-neutral-300 md:text-2xs'>
                              (تومان)
                            </p>
                          </th>
                        </tr>
                      </thead>
                      <div className='flex max-h-full w-full flex-wrap overflow-y-auto'>
                        {sortedData?.map((i, idx) => {
                          return (
                            <table
                              className={`flex w-full flex-wrap items-center justify-center overflow-y-auto ${idx % 2 === 0 ? 'bg-neutral-50 text-primary-600' : 'bg-neutral-100 text-primary-600'}`}
                            >
                              <tbody
                                className='flex h-9 w-full items-center justify-center overflow-hidden'
                                dir='rtl'
                              >
                                <DataTable
                                  dealType={filters?.dealType}
                                  key={idx}
                                  item={i}
                                />
                              </tbody>
                            </table>
                          )
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className='flex w-full flex-col items-center justify-center gap-2 overflow-hidden py-60'>
                      <NoFile color='var(--warning-500)' size={150} />
                      <p className='text-sm text-neutral-700'>
                        فایلی برای نمایش وجود ندارد
                      </p>
                    </div>
                  )}
                </main>
                <div className='flex h-10 w-full items-center justify-center'>
                  {allFiles?.data?.length ? (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  ) : null}
                </div>
              </>
            )}
          </section>
          <div className='mt-2 h-full w-[22%] flex-wrap items-center justify-center overflow-y-scroll border-l-2 border-primary-600 pb-10 pl-4 max-md:hidden'>
            <FilterForm setFilters={setFilters} setIsFilter={setIsFilter} />
          </div>
        </div>
      </div>

      <div
        className={cn(
          'no-scrollbar absolute bottom-0 z-40 h-screen w-full flex-wrap items-center justify-center overflow-y-scroll bg-white px-2 pb-10 pt-14',
          {
            hidden: !isFilter,
          }
        )}
      >
        <div className='mb-4 flex h-12 w-full items-center justify-between border-b-2 bg-white pr-1'>
          <Button
            onClick={() => setIsFilter(false)}
            className='bg-transparent p-0'
          >
            <X size={25} />
          </Button>
          <p>فیلترها</p>
        </div>
        <FilterForm setFilters={setFilters} setIsFilter={setIsFilter} />
      </div>
    </div>
  )
}

export default Files
