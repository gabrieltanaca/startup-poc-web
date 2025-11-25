'use client';

import { useState, useMemo, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { useLanguage } from '@/contexts/Language';
import { deleteHistory, getHistory, HistoryItem } from '@/service/history';
import { useToast } from '@/hooks/use-toast';
import Modal from '@/components/Modal';
import Table from '@/components/Table';
import { getHistoryColumns } from './constants';

const HistoryPage = () => {
  const { t, lang } = useLanguage();
  const toast = useToast();

  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<HistoryItem | 'all' | null>(null);

  const handleOpenDeleteModal = (item: HistoryItem | 'all') => {
    setItemToDelete(item);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;

    setIsLoading(true);

    setTimeout(async () => {
      if (itemToDelete === 'all') {
        setHistory([]);
        toast.success(t.history.toast_delete_all_success);
      } else {
        await deleteHistoryReq(itemToDelete.id);
        setHistory((prev) => prev.filter((item) => item.id !== itemToDelete.id));
        toast.success(`${t.history.toast_delete_one_success}. ID: ${itemToDelete.id}`);
      }
      setIsLoading(false);
      setIsModalOpen(false);
      setItemToDelete(null);
    }, 500);
  };

  const getHistoriesReq = async () => {
    setIsLoading(true);
    try {
      const response = await getHistory();
      setHistory(response);
    } catch (error) {
      console.error({ error });
      toast.error(`Error in Request Get History: ${error}`);
    }
    setIsLoading(false);
  };

  const deleteHistoryReq = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await deleteHistory(id);
      if (response.ok) getHistoriesReq();
    } catch (error) {
      console.error({ error });
      toast.error(`Error in Request Delete History: ${error}`);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getHistoriesReq();
  }, []);

  const isDeletingAll = itemToDelete === 'all';

  const title = isDeletingAll ? t.history.modal_title_all : t.history.modal_title_one;
  const description = isDeletingAll
    ? t.history.modal_desc_all
    : `${t.history.modal_desc_one_prefix} "${itemToDelete?.query}"?`;
  const helper = isDeletingAll ? t.history.modal_warning_all : t.history.modal_warning_one;

  const columns = useMemo(
    () => getHistoryColumns(t, isLoading, handleOpenDeleteModal, lang),
    [t, isLoading, handleOpenDeleteModal, lang],
  );

  return (
    <div className="flex-1 space-y-8 p-4 pt-6 md:p-8">
      <div className="flex flex-col items-start justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">{t.history.page_title}</h2>
        <Button
          variant="destructive"
          onClick={() => handleOpenDeleteModal('all')}
          className="flex items-center"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          {t.history.delete_all_button}
        </Button>
      </div>

      <Separator />

      <Table
        title={t.history.table_title}
        data={history}
        columns={columns}
        onSearchTermChange={setSearchTerm}
        isLoading={isLoading}
        hasPaginated={true}
        hasSearch={true}
        className="w-full"
        emptyStateText={searchTerm ? t.table.no_results_filtered : t.table.no_results_default}
      />

      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        title={title}
        description={description}
        helper={helper}
        onConfirm={handleDeleteConfirm}
        isLoading={isLoading}
        actions={{
          cancel: t.general.modal_cancel,
          confirm: t.general.modal_confirm_delete,
        }}
      />
    </div>
  );
};

export default HistoryPage;
