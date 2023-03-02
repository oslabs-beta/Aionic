import { Outlet, useLocation } from 'react-router';
import ManifestList from './ManifestList';

function ManifestHub() {
  return (
    <div>
      <ManifestList />
    </div>
  );
}

export default ManifestHub;
