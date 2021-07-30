import React, { useEffect, lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

// import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
// import CollectionPageContainer from '../collection/collection.container';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
import { selectIsCollectionFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';

import Spinner from '../../components/spinner/spinner.component';
import ErrorBoundary from '../../components/error-boundary/error-boundary.component';

const CollectionsOverviewContainer = lazy(() => import('../../components/collections-overview/collections-overview.container'));
const CollectionPageContainer = lazy(() => import('../collection/collection.container'));

const ShopPage = ({ fetchCollectionsStart, match }) => {

    useEffect(() => {
        fetchCollectionsStart();
    }, [fetchCollectionsStart]); 

    return (<div className='shop-page'>
        <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
            <Route 
                exact 
                path={`${match.path}`} 
                component={CollectionsOverviewContainer}
                />
            <Route 
                path={`${match.path}/:collectionId`} 
                component={CollectionPageContainer}
                />
        </Suspense>
        </ErrorBoundary>
    </div>);    
}

const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsCollectionFetching,
    isCollectionLoaded: selectIsCollectionsLoaded
});

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);