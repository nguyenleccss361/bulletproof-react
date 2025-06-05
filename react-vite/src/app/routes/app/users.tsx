import { QueryClient } from '@tanstack/react-query';
import { Suspense, useEffect, useState } from 'react';

import { ContentLayout } from '@/components/layouts';
import { getUsersQueryOptions } from '@/features/users/api/get-users';
import UserTree from '@/features/users/components/headless-tree/user-tree';
import { UsersList } from '@/features/users/components/users-list';
import { Authorization, ROLES } from '@/lib/authorization';

export const clientLoader = (queryClient: QueryClient) => async () => {
  const query = getUsersQueryOptions();

  return {
    // userPromise: await queryClient.ensureQueryData(query),
    userPromise: queryClient.ensureQueryData(query),
  };
};

const UsersRoute = () => {
  const [showContent, setShowContent] = useState(false);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setShowContent(true);
  //   }, 5000);
  //   return () => clearTimeout(timeout);
  // }, []);

  // if (!showContent) {
  //   return (
  //     <div className="flex h-48 w-full items-center justify-center text-black">
  //       Waiting 5 seconds...
  //     </div>
  //   );
  // }

  return (
    <ContentLayout title="Users">
      <Authorization
        forbiddenFallback={<div>Only admin can view this.</div>}
        allowedRoles={[ROLES.ADMIN]}
      >
        <Suspense
          fallback={
            <div className="grid place-content-center text-black">
              Loading...
            </div>
          }
        >
          <UsersList />
        </Suspense>
        <br />
        <br />
        <br />
        <UserTree />
      </Authorization>
    </ContentLayout>
  );
};

export default UsersRoute;
