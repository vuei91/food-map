import NaverMap from "./components/NaverMap";
import RestaurantList from "./components/RestaurantList";
import Search from "./components/Search";

const Home = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/elasticsearch?keyword=${
      searchParams?.keyword ?? ""
    }&page=${searchParams?.page ?? 1}`
  );

  const restaurants = await resp.json();
  return (
    <div className="flex">
      <div className="flex-[2]">
        <Search />
        {restaurants?.length > 0 && (
          <RestaurantList
            restaurants={restaurants}
            page={searchParams?.page ? Number(searchParams?.page) : 1}
          />
        )}
      </div>
      <div className="flex-[3]">
        <NaverMap restaurants={restaurants} />
      </div>
    </div>
  );
};

export default Home;
