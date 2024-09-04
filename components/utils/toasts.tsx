import { toast } from "@/components/ui/use-toast";
// ============ GET ============
export function getProjectToast(success: boolean) {
    toast({
        variant: success ? "success" : "destructive",
        title: success ? "Succès !" : "Erreur !",
        description: success ? "Projets récupérés avec succès" : "Erreur lors de la récupération de projets.",
    });
}
export function getSprintToast(success: boolean) {
    toast({
        variant: success ? "success" : "destructive",
        title: success ? "Succès !" : "Erreur !",
        description: success ? "Sprints récupérés avec succès" : "Erreur lors de la récupération de sprints.",
    });
}
export function getTaskToast(success: boolean) {
    toast({
        variant: success ? "success" : "destructive",
        title: success ? "Succès !" : "Erreur !",
        description: success ? "Tâches récupérées avec succès" : "Erreur lors de la récupération de tâches.",
    });
}
export function getEstimationToast(success: boolean) {
    toast({
        variant: success ? "success" : "destructive",
        title: success ? "Succès !" : "Erreur !",
        description: success ? "Estimations récupérées avec succès" : "Erreur lors de la récupération d'estimations.",
    });
}
// ============ POST ============

export function postProjectToast(success: boolean) {
    toast({
        variant: success ? "success" : "destructive",
        title: success ? "Succès !" : "Erreur !",
        description: success ? "Projet ajouté avec succès" : "Erreur lors de l'ajout du projet.",
    });
}
export function postSprintToast(success: boolean) {
    toast({
        variant: success ? "success" : "destructive",
        title: success ? "Succès !" : "Erreur !",
        description: success ? "Sprint ajouté avec succès" : "Erreur lors de l'ajout du sprint.",
    });
}
export function postTaskToast(success: boolean) {
    toast({
        variant: success ? "success" : "destructive",
        title: success ? "Succès !" : "Erreur !",
        description: success ? "Tâche ajoutée avec succès" : "Erreur lors de l'ajout de la tâche.",
    });
}
export function postEstimationToast(success: boolean) {
    toast({
        variant: success ? "success" : "destructive",
        title: success ? "Succès !" : "Erreur !",
        description: success ? "Estimation ajoutée avec succès" : "Erreur lors de l'ajout de l'estimation.",
    });
}

// ============ DELETE ============
export function deleteProjectToast(success: boolean) {
    toast({
        variant: success ? "success" : "destructive",
        title: success ? "Succès !" : "Erreur !",
        description: success ? "Projet supprimé avec succès" : "Erreur lors de la suppression du projet.",
    });
}
export function deleteSprintToast(success: boolean) {
    toast({
        variant: success ? "success" : "destructive",
        title: success ? "Succès !" : "Erreur !",
        description: success ? "Sprint supprimé avec succès" : "Erreur lors de la suppression du sprint.",
    });
}
export function deleteTaskToast(success: boolean) {
    toast({
        variant: success ? "success" : "destructive",
        title: success ? "Succès !" : "Erreur !",
        description: success ? "Tâche supprimée avec succès" : "Erreur lors de la suppression de la tâche.",
    });
}
export function deleteEstimationToast(success: boolean) {
    toast({
        variant: success ? "success" : "destructive",
        title: success ? "Succès !" : "Erreur !",
        description: success ? "Estimation supprimée avec succès" : "Erreur lors de la suppression de l'estimation.",
    });
}
// ============ PUT ============

export function updateProjectToast(success: boolean) {
    toast({
        variant: success ? "success" : "destructive",
        title: success ? "Succès !" : "Erreur !",
        description: success ? "Projet modifié avec succès" : "Erreur lors de la modification du projet.",
    });
}
export function updateSprintToast(success: boolean) {
    toast({
        variant: success ? "success" : "destructive",
        title: success ? "Succès !" : "Erreur !",
        description: success ? "Sprint modifié avec succès" : "Erreur lors de la modification du sprint.",
    });
}
export function updateTaskToast(success: boolean) {
    toast({
        variant: success ? "success" : "destructive",
        title: success ? "Succès !" : "Erreur !",
        description: success ? "Tâche modifiée avec succès" : "Erreur lors de la modification de la tâche.",
    });
}
export function updateEstimationToast(success: boolean) {
    toast({
        variant: success ? "success" : "destructive",
        title: success ? "Succès !" : "Erreur !",
        description: success ? "Estimation modifiée avec succès" : "Erreur lors de la modification de l'estimation.",
    });
}


