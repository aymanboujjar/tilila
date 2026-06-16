<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class ProgramRegulationController extends Controller
{
    public function tilila(): InertiaResponse
    {
        return Inertia::render('user/tilila/reglement', [
            'downloadUrl' => route('program.reglement.tilila.download'),
        ]);
    }

    public function tililab(): InertiaResponse
    {
        return Inertia::render('user/tililab/reglement', [
            'downloadUrl' => route('program.reglement.tililab.download'),
        ]);
    }

    public function downloadTilila(): BinaryFileResponse|Response
    {
        return $this->downloadDocument(
            'reglement-tilila-awards-2026',
            'Reglement-Tilila-Awards-v4-2026',
        );
    }

    public function downloadTililab(): BinaryFileResponse|Response
    {
        return $this->downloadDocument('reglement-tililab-2026', 'Reglement-Tililab-v2-2026');
    }

    private function downloadDocument(string $basename, string $downloadName): BinaryFileResponse|Response
    {
        $pdf = public_path("documents/{$basename}.pdf");
        $docx = public_path("documents/{$basename}.docx");

        if (File::exists($pdf)) {
            return response()->download($pdf, "{$downloadName}.pdf");
        }

        if (File::exists($docx)) {
            return response()->download($docx, "{$downloadName}.docx");
        }

        abort(404);
    }
}
