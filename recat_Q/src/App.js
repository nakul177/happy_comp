import axios from "axios";
import { useEffect, useState } from "react";
import "./styles.css";
import ReactPaginate from "react-paginate";

export default function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [limit, setlimit] = useState(9);

  useEffect(() => {
    let url =
      search && search.length > 2
        ? `https://jsonplaceholder.typicode.com/posts?q=${search}&_limit=${limit}`
        : `https://jsonplaceholder.typicode.com/posts?_page=1&_limit=${limit}`;

    const landingData = async () => {
      await fetch(url)
        .then((res) => {
          setPage(res.headers.get("x-total-count"));
          return res.json();
        })
        .then((res) => {
          setData(res);
        })
        .catch((err) => console.error(err));
    };

    landingData();
  }, [limit, search]);

  const handleUser = async (id) => {
    console.log(id);
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => alert("Name :-" + data.name))
      .catch((err) => console.error(err));
  };

  const paginatePage = async (Currpage) => {
    await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${Currpage}&_limit=${limit}`
    )
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  };

  const handlePageClick = (e) => {
    paginatePage(e.selected + 1);
  };

  return (
    <div className="App">
      <div className="search">
        <input
          className="searchinput"
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
        />
      </div>
      <div className="row m-6">
        {data &&
          data.map((e) => (
            <div key={e.id} className="col-sm-6 col-md-4 my-5">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{e.title}</h5>
                  <p className="card-text">{e.body}</p>
                  <button
                    onClick={() => handleUser(e.userId)}
                    className="btn btn-primary"
                  >
                    User
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        pageCount={Math.floor(page / limit)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName="pagination justify-content-center"
        activeClassName="active"
      />
    </div>
  );
}
