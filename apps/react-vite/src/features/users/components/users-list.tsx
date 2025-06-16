import { Suspense } from 'react';
import { Await, useLoaderData, useAsyncValue } from 'react-router';

import { Spinner } from '@/components/ui/spinner';
import { Table } from '@/components/ui/table';
import { User } from '@/types/api';
import { formatDate } from '@/utils/format';

import { useSuspenseUsers, useUsers } from '../api/get-users';

import { DeleteUser } from './delete-user';

export const UsersList = () => {
  // ----- Use only useQuery -----

  const usersQuery = useUsers();
  if (usersQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  const users = usersQuery.data?.data;
  if (!users) return null;
  return <UsersTable dataProp={users} />;

  // ----- Use only useSuspenseQuery -----

  // const usersSuspenseQuery = useSuspenseUsers();
  // const users = usersSuspenseQuery.data.data;
  // return <UsersTable dataProp={users} />;

  // ----- Use only react-router -----

  // const { userPromise } = useLoaderData();
  // return (
  //   <Suspense
  //     fallback={
  //       <div className="grid place-content-center text-black">Loading...</div>
  //     }
  //   >
  //     <Await resolve={userPromise}>
  //       <UsersReactRouterTable />
  //     </Await>
  //   </Suspense>
  // );
};

function UsersReactRouterTable() {
  const { data } = useAsyncValue() as any;

  return (
    <Table
      data={data}
      columns={[
        {
          title: 'First Name',
          field: 'firstName',
        },
        {
          title: 'Last Name',
          field: 'lastName',
        },
        {
          title: 'Email',
          field: 'email',
        },
        {
          title: 'Role',
          field: 'role',
        },
        {
          title: 'Created At',
          field: 'createdAt',
          Cell({ entry: { createdAt } }) {
            return <span>{formatDate(createdAt)}</span>;
          },
        },
        {
          title: '',
          field: 'id',
          Cell({ entry: { id } }) {
            return <DeleteUser id={id} />;
          },
        },
      ]}
    />
  );
}

function UsersTable({ dataProp }: { dataProp: User[] }) {
  return (
    <Table
      data={dataProp}
      columns={[
        {
          title: 'First Name',
          field: 'firstName',
        },
        {
          title: 'Last Name',
          field: 'lastName',
        },
        {
          title: 'Email',
          field: 'email',
        },
        {
          title: 'Role',
          field: 'role',
        },
        {
          title: 'Created At',
          field: 'createdAt',
          Cell({ entry: { createdAt } }) {
            return <span>{formatDate(createdAt)}</span>;
          },
        },
        {
          title: '',
          field: 'id',
          Cell({ entry: { id } }) {
            return <DeleteUser id={id} />;
          },
        },
      ]}
    />
  );
}
