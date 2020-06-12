import React, { useRef, useEffect } from 'react'
import IconButton from '@material-ui/core/IconButton'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import LastPageIcon from '@material-ui/icons/LastPage'
import FirstPageIcon from '@material-ui/icons/FirstPage'

const FIRST_PAGE = 1

export default function Pagination(props) {
    const { page, totalPages, goToPage } = props,
        pageEl = useRef(null)

    function isValidPage(currentPage) {
        return (
            currentPage !== page &&
            !!currentPage &&
            Number.isInteger(currentPage) &&
            currentPage >= FIRST_PAGE &&
            currentPage <= totalPages
        )
    }

    function handleGoToPage(page) {
        if (!isValidPage(page)) {
            return
        }
        return goToPage(page)
    }

    function handleGoToFirstPage() {
        return handleGoToPage(FIRST_PAGE)
    }

    function handleGoToLastPage() {
        return handleGoToPage(totalPages)
    }

    function handleGoToPrevPage() {
        return handleGoToPage(page - 1)
    }

    function handleGoToNextPage() {
        return handleGoToPage(page + 1)
    }

    function setPageElText(page) {
        if (pageEl.current) {
            pageEl.current.innerText = page
        }
    }

    function resetPageElText() {
        setPageElText(page)
    }
    useEffect(resetPageElText, [page])
    return (
        <div >
            <IconButton onClick={handleGoToFirstPage} >
                <FirstPageIcon />
            </IconButton>
            <IconButton onClick={handleGoToPrevPage} >
                <NavigateBeforeIcon />
            </IconButton>
            <span >
                Showing page{' '}
                <span ref={pageEl} />
                {' '}
                of {totalPages}
            </span>
            <IconButton onClick={handleGoToNextPage} >
                <NavigateNextIcon />
            </IconButton>
            <IconButton onClick={handleGoToLastPage} >
                <LastPageIcon />
            </IconButton>
        </div>
    )
}

