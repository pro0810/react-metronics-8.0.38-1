/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {useQueryResponseLoading, useQueryResponsePagination} from '../../core/QueryResponseProvider'
import {useQueryRequest} from '../../core/QueryRequestProvider'
const UsersListPagination = () => {
  const pagination = useQueryResponsePagination()
  const isLoading = useQueryResponseLoading()
  const {updateState} = useQueryRequest()
  const updatePage = (page: number | null) => {
    if (!page || isLoading || pagination.page === page) {
      return
    }

    updateState({page, items_per_page: pagination.items_per_page || 10})
  }

  return (
    <div className='row'>
      <div className='col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'></div>
      <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'>
        <div id='kt_table_users_paginate'>
          <ul className='pagination'>
            {pagination.links?.map((link) => (
              <li
                key={link.label}
                className={clsx('page-item', {
                  active: pagination.page === link.page,
                  disabled: isLoading,
                  previous: link.label === '&laquo; Previous',
                  next: link.label === 'Next &raquo;',
                })}
              >
                <a
                  className='page-link'
                  onClick={() => updatePage(link.page)}
                  dangerouslySetInnerHTML={{__html: link.label}}
                  style={{cursor: 'pointer'}}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export {UsersListPagination}
