import { RefObject } from 'react';
import { Popover } from '@base-ui-components/react/popover';
import { PopupContentProps } from './SearchBar';

export const Popup_Content = ({props} : {props: PopupContentProps}) => {
    const ref = props.searchBar_ref as RefObject<HTMLDivElement>;
    const isSearching = props.isSearching;
    const children = props.children;

    return (

        <Popover.Root open={isSearching}>
            <Popover.Portal>
                <Popover.Positioner positionMethod='absolute' anchor={ref} sideOffset={8}>
                    <Popover.Popup className="popup-container" initialFocus={ref} finalFocus={ref}>
                        <Popover.Title className="popup-title">Búsqueda de productos:</Popover.Title>
                        <Popover.Description className="popup-description">
                            {children}
                        </Popover.Description>
                    </Popover.Popup>
                </Popover.Positioner>
            </Popover.Portal>
        </Popover.Root>

    )

}

