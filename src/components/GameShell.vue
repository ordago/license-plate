<template>
    <div class="pt-2 pb-6 md:py-6   bg-red-300 h-full">
        <!-- This example requires Tailwind CSS v2.0+ -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- We've used 3xl here, but feel free to try other max-widths based on your needs -->
            <div class="max-w-3xl mx-auto rounded-lg bg-indigo-900 bg-slate-800">
                <h1 class="text-2xl font-semibold text-gray-900 p-2">
                    <slot name="title"/>
                </h1>
                <div class="px-4 py-5 sm:p-6">
                    <!-- Content goes here -->
                    <slot/>
                </div>
            </div>
        </div>
    </div>
</template>
