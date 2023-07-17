import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Content = () => {

    const [categories, setCategories] = useState([]);
    const [houses, setHouses] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [url, setUrl] = useState('');
    const [cateId, setCateId] = useState(0);

    const [type, setType] = useState([]);
    const [value, setValue] = useState([[0, 0], [0, 0]]);
    const [key, setKey] = useState(0);

    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(4);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginates, setPaginates] = useState([]);
    const [totalPaginate, setTotalPaginate] = useState();



    useEffect(() => {
        fetch('http://localhost:9999/category')
            .then(res => res.json())
            .then(data => setCategories(data))
    }, [])

    useEffect(() => {
        fetch('http://localhost:9999/account')
            .then(res => res.json())
            .then(data => setAccounts(data))
    }, [])

    const paginateData = (data) => {
        let total = 0;
        const t = data.length;
        const d = t / 4;
        if (d % 1 === 0) {
            total = d;
        } else {
            total = Math.ceil(d);
        }
        let array = [];
        for (var i = 0; i < total; i++) {
            array.push(i + 1);
        }
        return {
            total: total,
            array: array
        }
    }

    const afterFetch = (data) => {
        setTotalPaginate(paginateData(data).total);
        setPaginates(paginateData(data).array);
        setHouses(data.slice(startIndex, endIndex));
    }


    useEffect(() => {
        fetch(`http://localhost:9999/houseInformation?${url}`)
            .then(res => res.json())
            .then(data => {
                afterFetch(data)
            })
    }, [url, startIndex, key])


    const handlePaginate = (msg, paginate = 0) => {
        if (msg === 'prev') {
            setCurrentPage(current => current - 1);
            setStartIndex(start => start - 4);
            setEndIndex(end => end - 4)
        }
        if (msg === 'next') {
            setCurrentPage(current => current + 1);
            setStartIndex(start => start + 4);
            setEndIndex(end => end + 4)
        }
        if (msg === 'click') {
            setStartIndex((paginate - 1) * 4);
            setEndIndex((paginate - 1) * 4 + 4);
            setCurrentPage(paginate);
        }
        if (msg === 'reset') {
            setStartIndex(0);
            setEndIndex(4);
            setCurrentPage(1);
        }
    }

    const changeByCateId = (msg, id) => {
        setCateId(id)
        setUrl(msg);
        handlePaginate('reset');
    }

    useEffect(() => {
        if (type.length === 1 && type[0] === 'area') {
            switch (key) {
                case 0:
                    setValue([[0, 0], [0, 0]]);
                    break;
                case 1:
                    setValue([[0, 18], [0, 0]]);
                    break;
                case 2:
                    setValue([[18, 25], [0, 0]]);
                    break;
                case 3:
                    setValue([[25, 35], [0, 0]]);
                    break;
                case 4:
                    setValue([[35, 0], [0, 0]]);
                    break;
                default:
                    break;
            }
        }
        if (type.length === 1 && type[0] === 'price') {
            switch (key) {
                case 0:
                    setValue([[0, 0], [0, 0]]);
                    break;
                case 1:
                    setValue([[0, 1.6], [0, 0]]);
                    break;
                case 2:
                    setValue([[1.6, 2.5], [0, 0]]);
                    break;
                case 3:
                    setValue([[2.5, 3.5], [0, 0]]);
                    break;
                case 4:
                    setValue([[3.5, 0], [0, 0]]);
                    break;
                default:
                    break;
            }
        }
        if(type[0] === 'price' && type[1] === 'area') {
            switch (key) {
                case 0:
                    setValue([[0, 0], [0, 0]]);
                    break;
                case 1:
                    setValue([[0, 1.6], [0, 18]]);
                    break;
                case 2:
                    setValue([[1.6, 2.5], [18, 25]]);
                    break;
                case 3:
                    setValue([[2.5, 3.5], [25, 35]]);
                    break;
                case 4:
                    setValue([[3.5, 0], [35, 0]]);
                    break;
                default:
                    break;
            }
        }
        if(type[0] === 'area' && type[1] === 'price') {
            switch (key) {
                case 0:
                    setValue([[0, 0], [0, 0]]);
                    break;
                case 1:
                    setValue([[0, 18], [0, 1.6]]);
                    break;
                case 2:
                    setValue([[18, 25], [1.6, 2.5]]);
                    break;
                case 3:
                    setValue([[25, 35], [2.5, 3.5]]);
                    break;
                case 4:
                    setValue([[35, 0], [3.5, 0]]);
                    break;
                default:
                    break;
            }
        }
    }, [key, type])

    const handleSelect = (e, msg) => {
        setKey(parseInt(e.target.value))
        let a = [...type];
        a.push(msg);
        setType(a);
    }

    const handleSearch = () => {
        if (key === 0) {
            fetch('http://localhost:9999/houseInformation')
                .then(res => res.json())
                .then(data => {
                    afterFetch(data)
                })
        }
        if (type.length === 1 && type[0] === 'price') {
            fetch('http://localhost:9999/houseInformation')
                .then(res => res.json())
                .then(data => {
                    const v = value[0];
                    const result = data.filter(d =>
                        d.price >= v[0] && d.price <= v[1]
                    )
                    afterFetch(result);
                }
                )
        }
        if (type.length === 1 && type[0] === 'area') {
            fetch('http://localhost:9999/houseInformation')
                .then(res => res.json())
                .then(data => {
                    const v = value[0];
                    const result = data.filter(d =>
                        d.area >= v[0] && d.area <= v[1]
                    )
                    afterFetch(result);
                })
        }
        if(type[0] === 'area' && type[1] === 'price') {
            fetch('http://localhost:9999/houseInformation')
                .then(res => res.json())
                .then(data => {
                    const v = value[0];
                    const a = value[1];
                    const result = data.filter(d =>
                        d.area >= v[0] && d.area <= v[1] && d.price >= a[0] && d.price <= a[1]
                    )
                    afterFetch(result);
                })
        }
        if(type[0] === 'price' && type[1] === 'area') {
            fetch('http://localhost:9999/houseInformation')
                .then(res => res.json())
                .then(data => {
                    const v = value[0];
                    const a = value[1];
                    const result = data.filter(d =>
                        d.area >= a[0] && d.area <= a[1] && d.price >= v[0] && d.price <= v[1]
                    )
                    afterFetch(result);
                })
        }
    }

    return (
        <div className="container content">
            <div className='content-header'>
                <button onClick={() => changeByCateId(` `, 0)} className={cateId === 0 ? 'btn-category active-category' : 'btn-category'}>Tất cả</button>
                {
                    categories.map(category =>
                        <button key={category.id} onClick={() => changeByCateId(`category_id=${category.id}`, category.id)} className={category.id === cateId ? 'btn-category active-category' : 'btn-category'}>{category.name}</button>
                    )
                }

                <div className='search-price'>
                    <select onChange={(e) => handleSelect(e, 'price')}>
                        <option value={0}>---Chọn giá---</option>
                        <option value={1}>Dưới 1.6tr/tháng</option>
                        <option value={2}>Từ 1.6 - 2.5tr/tháng</option>
                        <option value={3}>Từ 2.5 - 3.5tr/tháng</option>
                        <option value={4}>Trên 3.5tr/tháng</option>
                    </select>
                </div>
                <div className='search-area'>
                    <select onChange={(e) => handleSelect(e, 'area')}>
                        <option value={0}>---Chọn diện tích---</option>
                        <option value={1}>Dưới 18m2</option>
                        <option value={2}>Từ 18m2 - 25m2</option>
                        <option value={3}>Từ 25m2 - 35m2</option>
                        <option value={4}>Trên 35m2</option>
                    </select>
                </div>
                <div>
                    <button className='btn btn-primary' onClick={handleSearch}>Search</button>
                </div>
            </div>

            <div className='row house'>
                {
                    houses.map(house =>
                        <div key={house.id} className='house-item col-lg-3 col-md-4 col-sm-6 col-xs-12'>
                            <Link to={`/house/detail/${house.id}`}>
                                <div className='house-img'>
                                    <img style={{ width: "100%", height: "300px" }} src={house.thumb} alt='#' />
                                </div>
                                <div className='house-name'>{house.name}</div>
                                <div style={{color:'rgb(133, 121, 121)'}}  className='house-address'>
                                    <i class="fas fa-map-marker-alt"></i>
                                    <span>{house.address}</span>
                                </div>
                                <div style={{display:'flex', justifyContent:'space-between'}}>
                                    <div style={{color:'rgb(133, 121, 121)'}}>
                                        <i class="fas fa-ruler"></i>
                                        <span>{house.area}m2</span>
                                    </div>
                                    <div style={{color:'rgb(133, 121, 121)'}}>
                                        <i class="fas fa-money-bill"></i>
                                        <span>{house.price}tr/tháng</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )
                }
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className='paginate'>
                    <button disabled={currentPage === 1 ? 'true' : ''} onClick={() => handlePaginate('prev')} className='btn-paginate-change disabled'><i class="fas fa-angle-left"></i></button>
                    {
                        paginates.map(paginate =>
                            <button onClick={() => handlePaginate('click', paginate)} className={paginate === currentPage ? 'btn-paginate active-paginate' : 'btn-paginate'}>{paginate}</button>
                        )
                    }
                    <button disabled={currentPage === totalPaginate ? 'true' : ''} onClick={() => handlePaginate('next')} className='btn-paginate-change'><i class="fas fa-angle-right"></i></button>
                </div>
            </div>
        </div>
    );
}

export default Content;