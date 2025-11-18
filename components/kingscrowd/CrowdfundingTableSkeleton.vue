<template>
  <div class="w-full">
    <TableHeaderSection
      title="Active Public Fundraising Opportunities"
      description="Explore companies currently raising funds from the public. Each listing includes key details: company name, platform, funds raised, and valuation. Compare opportunities to make informed investment decisions."
    />
    <div class="flex justify-end mb-4">
      <Skeleton class="h-10 w-32" />
    </div>

    <div
      class="rounded-md border border-border shadow-lg overflow-hidden"
      role="region"
      aria-label="Loading crowdfunding deals table"
    >
      <Table>
        <TableHeader>
          <TableRow class="bg-muted">
            <TableHead class="font-semibold text-primary" scope="col">
              Raise Name
            </TableHead>
            <TableHead class="font-semibold text-primary" scope="col">
              Raise Status
            </TableHead>
            <TableHead class="font-semibold text-primary" scope="col">
              Platform
            </TableHead>
            <TableHead class="font-semibold text-primary" scope="col">
              Money Raised
            </TableHead>
            <TableHead class="font-semibold text-primary" scope="col">
              Valuation
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="i in 25" :key="i" class="hover:bg-muted/30">
            <TableCell>
              <Skeleton class="h-5 w-48 mx-auto" aria-hidden="true" />
            </TableCell>
            <TableCell>
              <Skeleton
                class="h-6 w-20 mx-auto rounded-full"
                aria-hidden="true"
              />
            </TableCell>
            <TableCell>
              <Skeleton class="h-5 w-32 mx-auto" aria-hidden="true" />
            </TableCell>
            <TableCell>
              <Skeleton class="h-5 w-24 mx-auto" aria-hidden="true" />
            </TableCell>
            <TableCell>
              <Skeleton class="h-5 w-24 mx-auto" aria-hidden="true" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <div class="flex justify-end items-center mt-6">
      <div class="flex gap-2">
        <Skeleton class="h-10 w-20" />
        <Skeleton class="h-10 w-10" />
        <Skeleton class="h-10 w-10" />
        <Skeleton class="h-10 w-10" />
        <Skeleton class="h-10 w-20" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Table from "~/components/ui/table/Table.vue";
import TableHeader from "~/components/ui/table/TableHeader.vue";
import TableBody from "~/components/ui/table/TableBody.vue";
import TableRow from "~/components/ui/table/TableRow.vue";
import TableHead from "~/components/ui/table/TableHead.vue";
import TableCell from "~/components/ui/table/TableCell.vue";
import Skeleton from "~/components/ui/skeleton/Skeleton.vue";
import TableHeaderSection from "~/components/kingscrowd/TableHeaderSection.vue";
</script>
