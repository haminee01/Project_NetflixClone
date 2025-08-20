import React, { useState } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { useSearchParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import Alert from "react-bootstrap/Alert";
import { Col, Container, Row } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import "./MoviePage.style.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("popularity.desc");
  const [genre, setGenre] = useState(null);
  const keyword = query.get("q");
  const pageRange = window.innerWidth < 768 ? 2 : 7;

  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
    sort,
    genre,
  });

  const { data: genres } = useMovieGenreQuery();

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  const handleSortChange = (sortOption) => {
    setSort(sortOption);
    setPage(1);
  };

  const handleGenreChange = (genreId) => {
    setGenre(genreId);
    setPage(1);
  };

  if (isLoading) {
    return (
      <div className="spinner">
        <ClipLoader color="#ffff" loading={isLoading} size={150} />
      </div>
    );
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <Container>
      <Row>
        <Col lg={4} xs={12} className="dropdown-area">
          {/* Sort 드롭다운 */}
          <div>
            <DropdownButton id="dropdown-basic-button" title="Sort">
              <Dropdown.Item
                onClick={() => handleSortChange("popularity.desc")}
              >
                Popularity
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => handleSortChange("vote_average.desc")}
              >
                Rating
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => handleSortChange("release_date.desc")}
              >
                Latest
              </Dropdown.Item>
            </DropdownButton>
          </div>
          {/* Genre 드롭다운 */}
          <div>
            <DropdownButton id="dropdown-basic-button" title="Genre">
              {genres?.map((g) => (
                <Dropdown.Item
                  key={g.id}
                  onClick={() => handleGenreChange(g.id)}
                >
                  {g.name}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </div>
        </Col>
        <Col lg={8} xs={12}>
          <Row>
            {data?.results.map((movie, index) => (
              <Col key={index} lg={4} xs={12} className="card-area">
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
          <ReactPaginate
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={pageRange}
            marginPagesDisplayed={1}
            pageCount={data?.total_pages}
            previousLabel="<"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
            forcePage={page - 1}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;
