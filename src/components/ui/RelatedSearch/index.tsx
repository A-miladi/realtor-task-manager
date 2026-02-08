import { cn } from '@/utils'

type RelatedSearchProps = {
  relatedSearchClassName?: string
  queryValue: string
  label?: string
}

const RelatedSearch = ({
  relatedSearchClassName,
  label,
}: RelatedSearchProps) => {
  // const [relatedItems, setRelatedItems] = useState(null)

  // useEffect(() => {
  //   const fetchRelatedProducts = async () => {
  //     try {
  //       const trimmedQuery = queryValue.trim()
  //       if (trimmedQuery !== '') {
  //         const response: GetProductsTypes = await getProducts(trimmedQuery)
  //         const products = response.results.slice(0, 3)
  //         setRelatedItems(products)
  //       } else {
  //         setRelatedItems(null)
  //       }
  //     } catch (error) {
  //       setRelatedItems([])
  //     }
  //   }

  //   fetchRelatedProducts()
  // }, [queryValue])

  // if (!relatedItems || relatedItems.length === 0) {
  //   return null
  // }

  return (
    <div className='flex md:block'>
      <div
        className={cn(
          'flex flex-col rounded-xl bg-white',
          relatedSearchClassName
        )}
      >
        <p className='text-xs font-medium text-black md:text-sm'>{label}</p>
        <div className='flex flex-col gap-2'>
          {/* {relatedItems.map(({ id, title }) => (
            <Link
              href={`/product/${id}`}
              className='flex items-center gap-2 md:gap-3.5'
              key={id}
            >
              <Image
                src={SearchNormal}
                width={24}
                height={24}
                alt='nazargoo-search'
                className='h-5 w-5 md:h-6 md:w-6'
              />
              <p className='text-xs font-normal text-black md:text-sm'>
                {title}
              </p>
            </Link>
          ))} */}
        </div>
      </div>
    </div>
  )
}

export default RelatedSearch
