import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route, Outlet } from 'react-router-dom'

import EditProfilePage from './EditProfilePage';


const RenderRouteWithOutletContext = ({
    context,
    children,
}) => {
    return (
        <MemoryRouter>
            <Routes>
                <Route path="/" element={<Outlet context={context} />}>
                    <Route index element={children} />
                </Route>
            </Routes>
        </MemoryRouter>
    );
};

describe('EditProfilePage', () => {
    describe('rendering', () => {
        it('should render an empty location dropdown when the user does not already have location data', () => {
            render(
                <RenderRouteWithOutletContext context={{ user: { uid: '123' } }}>
                    <EditProfilePage />
                </RenderRouteWithOutletContext>
            );
            expect(screen.getByLabelText('Location')).toBeDefined();
        });
        it('should render the location dropdown with the country preselected', () => {
            ;
        });
    });
})
