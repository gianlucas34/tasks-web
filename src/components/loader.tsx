export const Loader = ({ isLarge = false }: { isLarge?: boolean }) =>
  isLarge ? (
    <div className="flex items-center justify-center w-full min-h-screen">
      <div className="w-10 h-10 inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
    </div>
  ) : (
    <div className="w-4 h-4 inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
  )
